# Adatgyűjtő alkalmazás az érzékelő mobilrendszerek kurzusra

Ionic-ban fejlesztett app, amely a telefon accelerometer tengelyadatait, timestamp-pel ellátva összegyűjti, csv-be konvertálja, majd a fájlt feltölti az adatgyűjtő szerverre (a szerver forrása egy szinttel feljebb található ebben a repositoryban)

A gyakorlati prezentáció miatt server url helyett csak az ngrok átjáró azonosítóját kéri.

Amennyiben buildelési hiba történik, érdemes felülvizsgálni a következőket: 
* Be van-e állítva az ANDROID_HOME és JAVA_HOME?
* Az android parancs elérhető-e terminálban? 
* Fent van-e a 26-os verziójú Android SDK?
* Friss az Ionic és Cordova verziója?
* Történt az Ionic és Cordova verziókban olyan módosítás, amely miatt nem működhetnek az ionic-native pluginok? (A projekt készítésekor is volt, ezért vannak 4.3.0-ra fixen visszaverziózva)

Buildelés menete:

```javascript
$ npm install
$ ionic cordova run android
```

Builelés feltétele: futó Android emulátor vagy ADB-vel felcsatlakoztatott valódi Android okostelefon
A buildelés során a platforms/android/build/outputs/apk mappában létrejön egy unsigned .apk fájl, amely aláírható, önállóan is kiadható telefonokra, Play Store-ba, stb.

Az alkalmazás layoutja és az exportált .csv fájl felépítés is az alábbi videóban bemutatott adatfeldolgozási eljáráshoz igazodik:
http://pyvideo.org/pydata-london-2016/neal-lathia-mining-smartphone-sensor-data-with-python.html

Felelős fejlesztő: Szabó Zoltán

