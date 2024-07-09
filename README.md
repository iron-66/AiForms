# AiForms

## About the project

AiForms is an application for extracting questions from forms presented as images or PDFs. The project is intended to provide a convenient interface in Russian and solve the problem of accessibility of OpenAI and Claude in Russia by using the local LLM Ollama + llava.

## Key Features

- Upload and process images of forms and PDF documents
- Extract questions from forms and present them in JSON format
- Supports various response types including text, date, and radiobutton
- View and manage downloaded forms via web interface

### Planned Features

- Increased accuracy of recognition of questions and answer types
- Improvement of the user interface, its complete redesign, translation into Russian
- Implementation of the reverse generation functionality form + data -> pdf

## Launching the application

1. Install Ollama by following the instructions on [official website](https://ollama.com/)
2. After installation, run the command in cmd:
    ```ollama run llava```
3. Go to your project folder and install the required dependencies:
    ```npm install```
4. While in the project folder, run the program with the command:
    ```node server.js```
5. The application interface will be available at ```http://localhost:3000/```

## Contacts

The project is based on the idea and developments of Tim Paul.
Source code and other materials can be found on his [GitHub](https://github.com/timpaul/form-extractor-prototype)

To ask any question, [message to me](https://t.me/iron66)