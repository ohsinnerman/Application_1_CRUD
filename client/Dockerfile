FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# In production this would be built and served by Nginx statically, 
# but for this compose setup we are treating 'client' as a running service 
# that Nginx proxies to.
CMD ["npm", "run", "dev", "--", "--host"]
