
# How to use it

* demo.html gives a demo on how to use qrcode.js

* Make qrcode.js in the same directory of the web page,and change the text in the below code.

 ```<h2>qrcode.js</h2> <h2>qrcode.js</h2> <h2>qrcode.js</h2>
 <h2>qrcode.js</h2>    <div id="qrcode"></div>
    <script type="text/javascript" src="qrcode.js"></script>
    <script type="text/javascript">
      //Type 1
      // normal QRcode style 
 		new QRCode(document.getElementById("qrcode"), "https://www.bing.com");

      // Type 2
      // QRcode with colored background
      var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: "https://www.bing.com",
        width: 128,
        height: 128,
        colorDark: "#f60",
        colorLight: "#ccc",
        correctLevel: 0 // the complexity of QRcode (0-3)
    });
 ```
 
 * If you want, you can input the json.link in flowerStory.js in such format to get the corresponding QR code.
 ```
 json.link = ROOT_URL + "/flowerStory/" + json.id;
 new QRCode(document.getElementById("qrcode"), json.link);
 ```

## Reference


https://github.com/davidshimjs/qrcodejs


## License

MIT License

## Contact(developer)


twitter @davidshimjs
