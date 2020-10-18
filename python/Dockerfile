FROM python:3.7.4-alpine3.10

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 4433

ENV FLASK_APP=/app/app.py
ENV FLASK_ENV=development

ENTRYPOINT [ "python3" ]
CMD [ "-m", "flask", "run", "--host", "0.0.0.0", "--port", "4433" ]
