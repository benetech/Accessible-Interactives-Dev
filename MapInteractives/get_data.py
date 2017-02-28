import urllib.request
import json
from apikey import *
state_data = {
	"WA": {
		"state": "Washington", 
		"coords": [
			47.042418, 
			-122.893077
		], 
		"capital": "Olympia"
	}, 
	"WI": {
		"state": "Wisconsin", 
		"coords": [
			43.074722, 
			-89.384444
		], 
		"capital": "Madison"
	}, 
	"WV": {
		"state": "West Virginia", 
		"coords": [
			38.349497, 
			-81.633294
		], 
		"capital": "Charleston"
	}, 
	"FL": {
		"state": "Florida", 
		"coords": [
			30.4518, 
			-84.27277
		], 
		"capital": "Tallahassee"
	}, 
	"WY": {
		"state": "Wyoming", 
		"coords": [
			41.145548, 
			-104.802042
		], 
		"capital": "Cheyenne"
	}, 
	"NH": {
		"state": "New Hampshire", 
		"coords": [
			43.220093, 
			-71.549127
		], 
		"capital": "Concord"
	}, 
	"NJ": {
		"state": "New Jersey", 
		"coords": [
			40.221741, 
			-74.756138
		], 
		"capital": "Trenton"
	}, 
	"NM": {
		"state": "New Mexico", 
		"coords": [
			35.667231, 
			-105.964575
		], 
		"capital": "Santa Fe"
	}, 
	"NC": {
		"state": "North Carolina", 
		"coords": [
			35.771, 
			-78.638
		], 
		"capital": "Raleigh"
	}, 
	"ND": {
		"state": "North Dakota", 
		"coords": [
			48.813343, 
			-100.779004
		], 
		"capital": "Bismarck"
	}, 
	"NE": {
		"state": "Nebraska", 
		"coords": [
			40.809868, 
			-96.675345
		], 
		"capital": "Lincoln"
	}, 
	"NY": {
		"state": "New York", 
		"coords": [
			42.659829, 
			-73.781339
		], 
		"capital": "Albany"
	}, 
	"RI": {
		"state": "Rhode Island", 
		"coords": [
			41.82355, 
			-71.422132
		], 
		"capital": "Providence"
	}, 
	"NV": {
		"state": "Nevada", 
		"coords": [
			39.160949, 
			-119.753877
		], 
		"capital": "Carson City"
	}, 
	"CO": {
		"state": "Colorado", 
		"coords": [
			39.7391667, 
			-104.984167
		], 
		"capital": "Denver"
	}, 
	"CA": {
		"state": "California", 
		"coords": [
			38.555605, 
			-121.468926
		], 
		"capital": "Sacramento"
	}, 
	"GA": {
		"state": "Georgia", 
		"coords": [
			33.76, 
			-84.39
		], 
		"capital": "Atlanta"
	}, 
	"CT": {
		"state": "Connecticut", 
		"coords": [
			41.767, 
			-72.677
		], 
		"capital": "Hartford"
	}, 
	"OK": {
		"state": "Oklahoma", 
		"coords": [
			35.482309, 
			-97.534994
		], 
		"capital": "Oklahoma City"
	}, 
	"OH": {
		"state": "Ohio", 
		"coords": [
			39.962245, 
			-83.000647
		], 
		"capital": "Columbus"
	}, 
	"KS": {
		"state": "Kansas", 
		"coords": [
			39.04, 
			-95.69
		], 
		"capital": "Topeka"
	}, 
	"SC": {
		"state": "South Carolina", 
		"coords": [
			34.0, 
			-81.035
		], 
		"capital": "Columbia"
	}, 
	"KY": {
		"state": "Kentucky", 
		"coords": [
			38.197274, 
			-84.86311
		], 
		"capital": "Frankfort"
	}, 
	"OR": {
		"state": "Oregon", 
		"coords": [
			44.931109, 
			-123.029159
		], 
		"capital": "Salem"
	}, 
	"SD": {
		"state": "South Dakota", 
		"coords": [
			44.367966, 
			-100.336378
		], 
		"capital": "Pierre"
	}, 
	"DE": {
		"state": "Delaware", 
		"coords": [
			39.161921, 
			-75.526755
		], 
		"capital": "Dover"
	}, 
	"HI": {
		"state": "Hawaii", 
		"coords": [
			21.30895, 
			-157.826182
		], 
		"capital": "Honolulu"
	}, 
	"TX": {
		"state": "Texas", 
		"coords": [
			30.266667, 
			-97.75
		], 
		"capital": "Austin"
	}, 
	"LA": {
		"state": "Louisiana", 
		"coords": [
			30.45809, 
			-91.140229
		], 
		"capital": "Baton Rouge"
	}, 
	"TN": {
		"state": "Tennessee", 
		"coords": [
			36.165, 
			-86.784
		], 
		"capital": "Nashville"
	}, 
	"PA": {
		"state": "Pennsylvania", 
		"coords": [
			40.269789, 
			-76.875613
		], 
		"capital": "Harrisburg"
	}, 
	"VA": {
		"state": "Virginia", 
		"coords": [
			37.54, 
			-77.46
		], 
		"capital": "Richmond"
	}, 
	"AK": {
		"state": "Alaska", 
		"coords": [
			58.301935, 
			-134.41974
		], 
		"capital": "Juneau"
	}, 
	"AL": {
		"state": "Alabama", 
		"coords": [
			32.361538, 
			-86.279118
		], 
		"capital": "Montgomery"
	}, 
	"AR": {
		"state": "Arkansas", 
		"coords": [
			34.736009, 
			-92.331122
		], 
		"capital": "Little Rock"
	}, 
	"VT": {
		"state": "Vermont", 
		"coords": [
			44.26639, 
			-72.57194
		], 
		"capital": "Montpelier"
	}, 
	"IL": {
		"state": "Illinois", 
		"coords": [
			39.78325, 
			-89.650373
		], 
		"capital": "Springfield"
	}, 
	"IN": {
		"state": "Indiana", 
		"coords": [
			39.790942, 
			-86.147685
		], 
		"capital": "Indianapolis"
	}, 
	"IA": {
		"state": "Iowa", 
		"coords": [
			41.590939, 
			-93.620866
		], 
		"capital": "Des Moines"
	}, 
	"AZ": {
		"state": "Arizona", 
		"coords": [
			33.448457, 
			-112.073844
		], 
		"capital": "Phoenix"
	}, 
	"ID": {
		"state": "Idaho", 
		"coords": [
			43.613739, 
			-116.237651
		], 
		"capital": "Boise"
	}, 
	"ME": {
		"state": "Maine", 
		"coords": [
			44.323535, 
			-69.765261
		], 
		"capital": "Augusta"
	}, 
	"MD": {
		"state": "Maryland", 
		"coords": [
			38.972945, 
			-76.501157
		], 
		"capital": "Annapolis"
	}, 
	"MA": {
		"state": "Massachusetts", 
		"coords": [
			42.2352, 
			-71.0275
		], 
		"capital": "Boston"
	}, 
	"UT": {
		"state": "Utah", 
		"coords": [
			40.7547, 
			-111.892622
		], 
		"capital": "Salt Lake City"
	}, 
	"MO": {
		"state": "Missouri", 
		"coords": [
			38.572954, 
			-92.189283
		], 
		"capital": "Jefferson City"
	}, 
	"MN": {
		"state": "Minnesota", 
		"coords": [
			44.95, 
			-93.094
		], 
		"capital": "Saint Paul"
	}, 
	"MI": {
		"state": "Michigan", 
		"coords": [
			42.7335, 
			-84.5467
		], 
		"capital": "Lansing"
	}, 
	"MT": {
		"state": "Montana", 
		"coords": [
			46.595805, 
			-112.027031
		], 
		"capital": "Helena"
	}, 
	"MS": {
		"state": "Mississippi", 
		"coords": [
			32.32, 
			-90.207
		], 
		"capital": "Jackson"
	}
}

for i in state_data:
	url = "https://api.forecast.io/forecast/{apikey}/{0},{1}/?units=us".format(*state_data[i]["coords"], apikey=apikey)
	response = urllib.request.urlopen(url)
	data = response.read().decode()
	data = json.loads(data)   
	cur_temp = data["currently"]["temperature"]
	if cur_temp < 10:
		state_data[i]["tempBucket"] = "Freezing Cold!"
	elif cur_temp < 30:
		state_data[i]["tempBucket"] = "cold"
	elif cur_temp < 50:
		state_data[i]["tempBucket"] = "cool"
	elif cur_temp < 80:
		state_data[i]["tempBucket"] = "warm"
	else:
		state_data[i]["tempBucket"] = "hot"
	state_data[i]["icon"] = data["currently"]["icon"]
	state_data[i]["wind"] = data["currently"]["windSpeed"]
	state_data[i]["humidity"] = data["currently"]["humidity"]
	del state_data[i]["coords"]
print(json.dumps(state_data, indent=4, sort_keys=True))