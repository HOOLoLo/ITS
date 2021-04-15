from flask import Flask
import pandas as pd
from flask import jsonify
from flask_cors import *
import socket
import json
import mercator_convertor as mc
import requests
# from flask_csv import send_csv
# data=[]
# with open('didi_data_feature.csv') as csvfile:
#     csv_reader=csv.reader(csvfile)
#     header=next(csvfile)
#     for row in csvfile:
#         data.append(row)

csv_data=pd.read_csv('didi_oneDay.csv')
csv_Covid=pd.read_csv('covid_rank.csv')
print(csv_data)
dic={}
for index,value in enumerate(csv_data['DepTime']):
    if value in dic :
        dic[value].append(str(csv_data['Origin'][index])+','+str(csv_data['Destination'][index])+','+str(csv_data['Trips'][index]))
    else:
        dic[value]=[]
app= Flask(__name__)
CORS(app, supports_credentials=True)

def get_pos_map():
    link_file=open('link_gps.v2','r')
    line = link_file.readline()
    result={}
    while line:
        line=line.split()
        result[line[0]]=[line[1],line[2]]
        line = link_file.readline()
    return result

def read_road_network():
    road_file=open('road_network_sub-dataset.v2','r')
    pos_map=get_pos_map()

    line_1 = road_file.readline()
    index = line_1.split()
    line =road_file.readline()
    road_data=[]
    count = 0
    while line :
        data=line.split()
        result={}
        for id, name in enumerate(index):
            result[name]=data[id]

        if result['link_id'] in pos_map :
            result['node_lng'] =pos_map [result['link_id']][0]
            result['node_lat']=pos_map [result['link_id']][1]
        else:
            count+=1
        # result['snode_lat']=pos_map[result['snodeid']][1]
        # result['enode_lon']=pos_map[result['enodeid']][0]'1520445066'
        # result['enode_lat']=pos_map[result['enodeid']][1]
        road_data.append(result)
        line=road_file.readline()
    return road_data

read_road_network()

@app.route('/pos_map')
def get_pos():
    return json.dumps(get_pos_map(), ensure_ascii=False)



@app.route('/data/<time>')
def get_data(time):
    # for i in dic[time]:
    result=[]
    list = time.split(':')
    if len(list)==1:
        list.append(int(list[0]))
    if len(list) > 1:
        for i in range(int(list[0]),int(list[1])+1,1):
            for route in dic[str(i)+':00:00']:
                result.append(route+','+str(i))
    # print(len(dic[time]))
    print(result)
    return jsonify(result)
@app.route('/covid_rank')
def get_Covid():
    result=[]
    for index,value in enumerate(csv_Covid['name']):
        result.append({"name":csv_Covid['name'][index],"value":str(csv_Covid['value'][index]), "date":csv_Covid['date'][index]})
    return json.dumps(result, ensure_ascii=False)


@app.route('/road_data')
def get_RoadData():
    res=read_road_network()
    return json.dumps(res, ensure_ascii=False)


pathdata=[]
m_route=[]
pos_match_map={}

with open("./neighbours_1km.txt","r") as path:
    pos_map = get_pos_map()
    for i in range(15073):
        data=path.readline()[2:-2]
        j=0
        splitData=data.split()
        oneline=[]
        for j in range(10):
            if j == 0:
                oneline.append(splitData[j][0:-2])
            elif j == 10:
                oneline.append(splitData[j][1:-1])
            else:
                oneline.append(splitData[j][1:-2])
        # if i%1 == 0:
        #     url="https://api.mapbox.com/matching/v5/mapbox/driving/"
        #     for index,s in enumerate(oneline):
        #         if index!= len(oneline)-1:
        #             url+=str(float(pos_map[s][0])-0.00622)+","+str(float(pos_map[s][1])-0.00142)+";"
        #         else:
        #             url += str(float(pos_map[s][0])-0.00622) + "," + str(float(pos_map[s][1])-0.00142)
        #     try:
        #         r=requests.get(url+"?access_token=pk.eyJ1IjoiemhpZ3VhbmdkYSIsImEiOiJjanozdXg0b3EwMHh4M21tcXk2MHlpN3B1In0.lInf8zFl2BsP_bDjMFhf3w")
        #         js=json.loads(r.text)
        #         for index, val in enumerate(js['tracepoints']):
        #             if val != None:
        #                 pos_match_map[s]=val['location']
        #         m_route.append(js)
        #         print(i)
        #     except:
        #         print("error")
        #     else:
        #         continue
        pathdata.append(oneline)
    # with open('./match_map.json','w') as f:
    #     f.write(json.dumps(pos_match_map, ensure_ascii=False))



match_map={}
match_p=[]
bound=[[200,200],[0,0]]

# def getbound():
#     lng1,lat1=mc.mc2coord(bound[0],bound[1])
#     lng2,lat2=mc.mc2coord(bound[0],bound[1])
#     return [[lng1,lat1],[lng2,lat2]]

root ={}
def getQuardTree():
    root['data']=[]
    for i in range(0,len(match_p)):
        root['data'].append(i)
    root['bound']=bound
    split(root,1)


# def scoreLCS():
#     max(scoreLCS()+simboj(pi,lj)),scores


def split(root,tag):
    if len(root['data']) >tag:
        x1=root['bound'][0][0]
        y1=root['bound'][0][1]
        x2=root['bound'][1][0]
        y2=root['bound'][1][1]
        mid_vertical = (root['bound'][0][0]+root['bound'][1][0])/2
        mid_horizontal = (root['bound'][0][1]+root['bound'][1][1])/2
        root['LU']={}
        root['RU']={}
        root['RD']={}
        root['LD']={}
        root['LU']['bound']=[[x1,mid_horizontal],[mid_vertical,y2]]
        root['LD']['bound']=[[x1,y1],[mid_vertical,mid_horizontal]]
        root['RU']['bound']=[[mid_vertical,mid_horizontal],[x2,y2]]
        root['RD']['bound']=[[mid_vertical,y1],[x2,mid_horizontal]]
        root['LD']['data']=[]
        root['RU']['data']=[]
        root['RD']['data']=[]
        root['LU']['data']=[]
        for d in root['data']:
            if match_p[d][0]<=mid_vertical:
                if match_p[d][1]>mid_horizontal:
                    root['LU']['data'].append(d)
                else:
                    root['LD']['data'].append(d)
            else:
                if match_p[d][1]>mid_horizontal:
                    root['RU']['data'].append(d)
                else:
                    root['RD']['data'].append(d)
        # print(root)
        split(root['LU'],tag)
        split(root['RU'],tag)
        split(root['RD'],tag)
        split(root['LD'],tag)

real_match_map={}
def getMatchMap():
    with open("./match_map.json") as f:
        real_match=json.load(f)
        for key in real_match:
            real_match_map[key]=real_match[key]
        print('real_match:',len(real_match_map))

with open('./match.json')as f:
    match_data = json.load(f)
    for i in match_data:
        if i['code']=='Ok':
            for k in i['tracepoints']:
                if k != None and str(k['location']) not in match_map:
                    match_p.append(k['location'])
                    match_map[str(k['location'])]=1
                    if k['location'][0]<bound[0][0]: bound[0][0]=k['location'][0]
                    if k['location'][1]<bound[0][1]: bound[0][1]=k['location'][1]
                    if k['location'][0]>bound[1][0]: bound[1][0]=k['location'][0]
                    if k['location'][1]>bound[1][1]: bound[1][1]=k['location'][1]

getQuardTree()
getMatchMap()

print(1)

@app.route("/path_data")
def getPath():
    return json.dumps(pathdata, ensure_ascii=False)

@app.route("/match_data")
def getMatch():
    return json.dumps(m_route, ensure_ascii=False)

@app.route("/quardTree")
def getQuard():
    return json.dumps(root,ensure_ascii=False)


@app.route("/match_map")
def getMatchMap():
    return json.dumps(real_match_map, ensure_ascii=False)


if __name__=='__main__':
    hostname = socket.gethostname()
    # 获取本机IP1111
    ip = socket.gethostbyname(hostname)
    print(ip)
    app.run(host="127.0.0.1",port=8888,debug=False)
