FROM {{harborServer}}/vbs/node:16-nginx-alpine3.16
COPY cicd/configs/nginx.conf /etc/nginx/nginx.conf
COPY dist/apps/virtualtravel /usr/share/nginx/html/

RUN npm install -g @vts-private/cli@latest

WORKDIR /usr/share/nginx/html/

CMD ["/bin/sh",  "-c",  "vts-cli inject-environment-html && exec nginx -g 'daemon off;'"]
