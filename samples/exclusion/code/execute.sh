mkdir -p out

find src -type f ! -name '*534*' | while read file; do
    filename=$(echo $file | sed 's/src\///g')
    destination=out/$filename
    cp -rf "$file" "$destination"
done