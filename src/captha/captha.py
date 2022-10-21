import easyocr


def text_recognition(file_path):
    reader = easyocr.Reader(["en"])
    result = reader.readtext(file_path, detail=0)

    with open("./src/captha/result.txt", "w") as file:
        for line in result:
            file.write(line)

    return f"Result captha {result[0]}"


def main():
    file_path = "./src/captha/captha.png"
    print(text_recognition(file_path=file_path))


if __name__ == '__main__':
    main()
