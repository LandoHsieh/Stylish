FROM node:18.18

RUN apt-get update
RUN apt-get install -y redis-server

WORKDIR /app
COPY . .

ENV PORT=3000

RUN ["npm","install"]

EXPOSE 3000

# 授予執行start.sh腳本權限
RUN chmod +x start.sh

CMD ["./start.sh"]