**JYD部屬方式(Ubuntu)**
===

Precondition
===
## 當前檔案階層
    /~
        /JYDFrontend            # JYD專案
            /document
            /e2e
            /node_modules
            /src
        /GameJS                           
            /Games              # 遊戲script
                /sambaqueen
                /luckymario
                /fivedragons
                ......

# Step 1 - 使用nginx server

## 1. 下載nginx
    sudo apt-get update  
    apt-get install nginx

## 2. Server 設定

### (1)  /etc/nginx/nginx.conf 部分設定內容
```
http {

       ......

	##
	# Gzip Settings
	##

	gzip on;

	gzip_vary on;
	gzip_proxied any;
	gzip_comp_level 6;
	gzip_buffers 16 8k;
	gzip_http_version 1.1;
	gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

	......

}
```
**主要是要確定Server端要啟用gzip壓縮，預設的nginx.conf gzip的部分都是comment掉的，
要將這部分uncomment!**


### (2) 在/etc/nginx/sites-available/ 底下新增jyd188.net檔案
````
server {
	listen 80;
	listen [::]:80;

	root /var/www/jyd188.net;

	# Add index.php to the list if you are using PHP
	index index.html index.htm index.nginx-debian.html;

	server_name jyd188.net www.jyd188.net;

	

	location ~* \.(jpe?g|png)$ {
		add_header Vary "Accept-Encoding";
		add_header Cache-Control "public, max-age=604800, no-transform";
	}

	location ~* \.(wav|mp3|mp4|json)$ {
		add_header Cache-Control "max-age=2419200";
	}

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		try_files $uri /index.html =404;
	}

}
````

### (3) 設定檔按系統連結

    sudo ln -s /etc/sites-available/jyd188.net /etc/sites-enable/jyd188.net

----

# Step 2 - Bundle 大廳專案

## 1.請在JYD專案底下 用下指令，bundle 專案

    npm install             # 確保專案有載入所需套件，可省略
    ng build --prod
    
**bundle完的專案會位在JYDFrotnend/dist/JYDFrontend/ 底下**

## 2.將專案複製到/var/www/jyd188.net/ 底下

    sudo rm -r /var/www/jyd188.net      # 第一次部屬可以省略
    sudo cp -r ~/JYDFrontend/dist/JYDFrontend /var/www/jyd188.net/
    
## 3.將遊戲目錄連結到JYD專案

    sudo ln -s ~/GameJS/Games /var/www/jyd188.net/assets/Games

## 4.在/var/www/jyd188.net/assets/imgs 目錄底下遞迴地產生webp圖片

**下載webp套件**

    sudo apt-get install webp

**執行以下指令產生webp圖片**

    cd /var/www/jyd188.net/assets/Games/imgs
    sudo find ./ -type f -name '*.png' -exec cwebp -q 70 {} -o {}.webp


----

# Step 3 - 啟動ngix server

    sudo systemctl start nginx

----
# Note

### 第一次bundle 需要執行 Step 1 ~ Step 3
### 第二次之後只要執行 Step 2 即可
### 原文連結: https://hackmd.io/ZZ0MGacZR7iafxCg23KewA?both
### 完整/etc/nginx/nginx.conf檔案
````
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
	worker_connections 768;
	# multi_accept on;
}

http {

	##
	# Basic Settings
	##

	sendfile on;
	tcp_nopush on;
	tcp_nodelay on;
	keepalive_timeout 65;
	types_hash_max_size 2048;
	# server_tokens off;

	# server_names_hash_bucket_size 64;
	# server_name_in_redirect off;

	include /etc/nginx/mime.types;
	default_type application/octet-stream;

	##
	# SSL Settings
	##

	 ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
	 ssl_prefer_server_ciphers on;

	##
	# Logging Settings
	##

	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;

	##
	# Gzip Settings
	##

	gzip on;

	gzip_vary on;
	gzip_proxied any;
	gzip_comp_level 6;
	gzip_buffers 16 8k;
	gzip_http_version 1.1;
	gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

	##
	# Virtual Host Configs
	##

	include /etc/nginx/conf.d/*.conf;
	include /etc/nginx/sites-enabled/*;

}


#mail {
#	# See sample authentication script at:
#	# http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
# 
#	# auth_http localhost/auth.php;
#	# pop3_capabilities "TOP" "USER";
#	# imap_capabilities "IMAP4rev1" "UIDPLUS";
# 
#	server {
#		listen     localhost:110;
#		protocol   pop3;
#		proxy      on;
#	}
# 
#	server {
#		listen     localhost:143;
#		protocol   imap;
#		proxy      on;
#	}
#}

````
### 完整/etc/nginx/sites-available/jyd188.net 檔案

````
##
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# https://www.nginx.com/resources/wiki/start/
# https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/
# https://wiki.debian.org/Nginx/DirectoryStructure
#
# In most cases, administrators will remove this file from sites-enabled/ and
# leave it as reference inside of sites-available where it will continue to be
# updated by the nginx packaging team.
#
# This file will automatically load configuration files provided by other
# applications, such as Drupal or Wordpress. These applications will be made
# available underneath a path with that package name, such as /drupal8.
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
##

# Default server configuration
#
server {
	listen 80;
	listen [::]:80;

	# SSL configuration
	#
	# listen 443 ssl default_server;
	# listen [::]:443 ssl default_server;
	#
	# Note: You should disable gzip for SSL traffic.
	# See: https://bugs.debian.org/773332
	#
	# Read up on ssl_ciphers to ensure a secure configuration.
	# See: https://bugs.debian.org/765782
	#
	# Self signed certs generated by the ssl-cert package
	# Don't use them in a production server!
	#
	# include snippets/snakeoil.conf;

	root /var/www/jyd188.net;

	# Add index.php to the list if you are using PHP
	index index.html index.htm index.nginx-debian.html;

	server_name jyd188.net www.jyd188.net;

	

	location ~* \.(jpe?g|png)$ {
		add_header Vary "Accept-Encoding";
		add_header Cache-Control "public, max-age=604800, no-transform";
	}

	location ~* \.(wav|mp3|mp4|json)$ {
		add_header Cache-Control "max-age=2419200";
	}

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		try_files $uri /index.html =404;
	}

	# pass PHP scripts to FastCGI server
	#
	#location ~ \.php$ {
	#	include snippets/fastcgi-php.conf;
	#
	#	# With php-fpm (or other unix sockets):
	#	fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;
	#	# With php-cgi (or other tcp sockets):
	#	fastcgi_pass 127.0.0.1:9000;
	#}
	# ssl on;
	# ssl_certificate     /etc/letsencrypt/live/treasure.nogf.xyz/fullchain.pem;
	# ssl_certificate_key /etc/letsencrypt/live/treasure.nogf.xyz/privkey.pem;
	# deny access to .htaccess files, if Apache's document root
	# concurs with nginx's one
	#
	#location ~ /\.ht {
	#	deny all;
	#}
}


# Virtual Host configuration for example.com
#
# You can move that to a different file under sites-available/ and symlink that
# to sites-enabled/ to enable it.
#
#server {
#	listen 0.0.0.0:80;
#	server_name treasure.nogf.xyz www.treasure.nogf.xyz;
#	rewrite ^ https://$host$request_uri? permanent;
#}
#	listen [::]:80;
#
#	server_name example.com;
#
#	root /var/www/example.com;
#	index index.html;
#
#	location / {
#		try_files $uri $uri/ =404;
#}

````