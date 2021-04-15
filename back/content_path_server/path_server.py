from flask import Flask
import pandas as pd
from flask import jsonify
from flask_cors import *
import socket
import json
import urllib.request

app= Flask(__name__)
CORS(app, supports_credentials=True)
dic={}

try:
    csv_data = pd.read_csv('content.csv')
    # csv_data=pd.read_csv('../content.csv')
    for index, value in enumerate(csv_data['name']):
        dic[value] = csv_data['path'][index]
finally:
    print("can't get content.csv")


@app.route('/content_map')
def get_pos():
    return json.dumps(dic, ensure_ascii=False)

if __name__=='__main__':
    hostname = socket.gethostname()
    # 获取本机IP1111
    ip = socket.gethostbyname(hostname)
    print(ip)
    app.run(host="10.72.100.6",port=8887,debug=False)
