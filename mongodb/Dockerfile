FROM mongo:4
COPY createUser.js /docker-entrypoint-initdb.d/
EXPOSE 27017
CMD ["mongod", "--auth"]