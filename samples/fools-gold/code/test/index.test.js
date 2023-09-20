const fs = require('fs');
const mysql = require('mysql2');
const {
  scan,
  shellFiles,
  dependencyCount,
  prohibitedCommands,
  restrictJavascript,
  restrictPython
} = require('@sliit-foss/bashaway');

jest.setTimeout(240000);

test('should validate if only bash files are present', () => {
  const shellFileCount = shellFiles().length;
  expect(shellFileCount).toBe(1);
  expect(shellFileCount).toBe(scan('**', ['src/**']).length);
});

describe('should check if database is configured properly', () => {
  const args = {
    host: 'localhost',
    port: '3307',
    database: 'vault',
    waitForConnections: true
  };
  const root = mysql.createConnection({
    ...args,
    user: 'root',
    password: 'fools-gold'
  });

  const ace = mysql.createConnection({
    ...args,
    user: 'ace',
    password: 'firefist'
  });

  const connect = (connection) =>
    new Promise((resolve, reject) =>
      connection.connect((err) => {
        if (err) reject(`failed to make initial database connection - ${err.toString()}`);
        resolve(true);
      })
    );

  const query = (connection, query) =>
    new Promise((resolve, reject) =>
      connection.query(query, (err, results) => {
        if (err) reject(`failed to execute query - ${err.toString()}`);
        resolve(results);
      })
    );

  beforeAll(async () => {
    await connect(root);
  });

  afterAll(() => root.end());

  test('should check if connection limit is set to 1', async () => {
    await expect(connect(ace)).rejects.toBe('failed to make initial database connection - Error: Too many connections');
  });

  test('should check if data is populated', async () => {
    const results = await query(root, 'select * from gold');
    expect(results.length).toBe(5);
  });
});

describe('should check installed dependencies', () => {
  let script;
  beforeAll(() => {
    script = fs.readFileSync('./execute.sh', 'utf-8');
  });
  test('javacript should not be used', () => {
    restrictJavascript(script);
  });
  test('python should not be used', () => {
    restrictPython(script);
  });
  test('no additional npm dependencies should be installed', async () => {
    await expect(dependencyCount()).resolves.toStrictEqual(3);
    expect(script).not.toMatch(prohibitedCommands);
  });
});
