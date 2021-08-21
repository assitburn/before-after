const toast = document.querySelector(".toast");
toast.onclick = () => {
    toast.classList.remove("visible");
};

function showToast(msg,time) {
    toast.textContent = msg;
    toast.classList.add("visible");
    setTimeout(() => {
        toast.classList.remove("visible");
    }, time);
}

function menuCommand(id) {
    require('photoshop').core.performMenuCommand({
      commandID: id,
      kcanDispatchWhileModal: true,
      _isCommand: false
    });
}

async function layeranzahl(){
    const app = require('photoshop').app;
    const myDoc = app.activeDocument;
    const docLayers = myDoc.layers;
    var aai ="";
    var anzahl=0;
    for (let i=0; i< docLayers.length; i++) {
        var anzahl = i;
    }
    layercount = anzahl;
    return anzahl;
}

async function ebenenauswahlaufheben(){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [
    {
        "_obj": "selectNoLayers",
        "_target": [
            {
                "_ref": "layer",
                "_enum": "ordinal",
                "_value": "targetEnum"
            }
        ],
        "_isCommand": true,
        "_options": {
            "dialogOptions": "dontDisplay"
        }
    }
    ],{
    "synchronousExecution": false,
    
    "historyStateInfo": {
        "name": label_Ebenenauswahl_aufgehoben,
        "target": {
           "_ref":"document",
           "_enum": "ordinal",
           "_value": "targetEnum"
        }}
    });

}

async function check_ebenen_nach_oben_zusammenfassen() {
    const app = require('photoshop').app;
    const myDoc = app.activeDocument;
    const docLayers = myDoc.layers;
    var aai ="";
    var nummer=0;
        for (let i=0; i< docLayers.length; i++) {
            var nummer = i;
        }
        
        if (nummer > 0){
            while(loop != "ebenen_nach_oben_zusammenfassen"){
                await require("photoshop").core.executeAsModal(ebenen_nach_oben_zusammenfassen);
            }
        }
    loop="check_ebenen_nach_oben_zusammenfassen";
}
async function ebenen_nach_oben_zusammenfassen(){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [
       {
          "_obj": "mergeVisible",
          "duplicate": true,
          "_isCommand": true,
          "_options": {
             "dialogOptions": "dontDisplay"
          }
       },
       {
          "_obj": "move",
          "_target": [
             {
                "_ref": "layer",
                "_enum": "ordinal",
                "_value": "targetEnum"
             }
          ],
          "to": {
             "_ref": "layer",
             "_enum": "ordinal",
             "_value": "front"
          },
          "_isCommand": true,
          "_options": {
             "dialogOptions": "dontDisplay"
          }
       },
       {
        "_obj": "move",
        "_target": [
           {
              "_ref": "layer",
              "_enum": "ordinal",
              "_value": "targetEnum"
           }
        ],
        "to": {
           "_ref": "layer",
           "_enum": "ordinal",
           "_value": "front"
        },
        "_isCommand": true,
        "_options": {
           "dialogOptions": "dontDisplay"
        }
     },
       {
          "_obj": "set",
          "_target": [
             {
                "_ref": "layer",
                "_enum": "ordinal",
                "_value": "targetEnum"
             }
          ],
          "to": {
             "_obj": "layer",
             "name": label_zusammengefasst
          },
          "_isCommand": true,
          "_options": {
             "dialogOptions": "dontDisplay"
          }
       }
    ],{
       "synchronousExecution": false,
       
       "historyStateInfo": {
        "name": label_zusammengefasst,
        "target": {
        "_ref":"document",
        "_enum": "ordinal",
        "_value": "targetEnum"
        }}
    });
    loop = "ebenen_nach_oben_zusammenfassen";
}
async function alle_ebenen_auswaehlen(){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [
    {
        "_obj": "selectAllLayers",
        "_target": [
            {
                "_ref": "layer",
                "_enum": "ordinal",
                "_value": "targetEnum"
            }
        ],
        "_isCommand": true,
        "_options": {
            "dialogOptions": "dontDisplay"
        }
    }
    ],{
    "synchronousExecution": false,
    
    "historyStateInfo": {
     "name": label_alle_ebenen_auswaehlen,
     "target": {
     "_ref":"document",
     "_enum": "ordinal",
     "_value": "targetEnum"
     }}
    });
}
async function ebene_loeschen_name(name){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [
    {
        "_obj": "delete",
        "_target": [
            {
                "_ref": "layer",
                "_name": name
            }
        ],
        "_isCommand": true,
        "_options": {
            "dialogOptions": "dontDisplay"
        }
    }
    ],{
    "synchronousExecution": false
    });
    loop = "ebene_loeschen_name";
}
async function check_start(info){
    //Check ob Dokument geöffnet
    const app = require('photoshop').app;
    var currentDocument = app.activeDocument;
    if (currentDocument == null){ 
        console.log(label_kein_doc_geladen);
        showToast_red(label_kein_doc_geladen);
        return false;
    }

    //Check 32 Bit
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
        [{
          "_obj": "get",
          "_target": [{
              "_property": "depth"
            },
            {
              "_ref": "document",
              "_enum": "ordinal",
              "_value": "targetEnum"
            }
          ],
          "_options": {
            "dialogOptions": "dontDisplay"
          }
        }], {
          "synchronousExecution": false
          
        });
    var documentDepth = result[0].depth;
    
    if (documentDepth == '32'){
        console.log(label_32bitohneunterstützung);
        showToast_red(label_32bitohneunterstützung);
        return false;
    }

    //check RGBColor
    const result2 = await batchPlay(
    [
        {
            "_obj": "get",
            "_target": [
                {
                "_property": "mode"
                },
                {
                "_ref": "document",
                "_enum": "ordinal",
                "_value": "targetEnum"
                }
            ],
            "_options": {
                "dialogOptions": "dontDisplay"
            }
        }
    ],{
        "synchronousExecution": false
        
    });
    let colormod = result2[0].mode._value;
    if (colormod!="RGBColor"){
        console.log(label_nur_rgb_farbraum);
        showToast_red(label_nur_rgb_farbraum);
       
        return false;
    }
}
const toast_red_breit = document.querySelector(".toast_red_breit");
toast_red_breit.onclick = () => {
    toast_red_breit.classList.remove("visible");
};

function showToast_red(msg) {
    toast_red_breit.textContent = msg;
    toast_red_breit.classList.add("visible");
    setTimeout(() => {
        toast_red_breit.classList.remove("visible");
    }, 10000);
}

function removetoast_red(){
    toast_red_breit.classList.remove("visible");
}

async function switch_kopie_check(){
    if(document.getElementById("switch_kopie").checked){
        document.getElementById("switch_kopie").innerHTML=label_links_unten;
        
        showToast(label_kopie_links,5000);
    }else{
        document.getElementById("switch_kopie").innerHTML=label_rechts_oben;
        showToast(label_kopie_rechts,5000);
    }   
}

async function laden(key,default_wert) {
    const savedPreference = localStorage.getItem(key);
    return (savedPreference === undefined) ? default_wert : savedPreference;
}

async function laden_zahl(key, default_wert) {
    const savedPreference = localStorage.getItem(key);
    return (savedPreference === undefined) ? parseInt(default_wert) : parseInt(savedPreference);
}

async function speichern(key,wert) {
    localStorage.setItem(key, wert.toString());
}

async function autostart(){
    const version_nummer = require("uxp").versions.plugin;
    const copyright_text= "&copy; 2021 Carsten Gerdes Version "+version_nummer;
    document.getElementById("copyright").innerHTML = copyright_text;    
    
    document.getElementById("FQ-rand-slider").value = await laden("rand","15");
    red = parseInt(await laden("red","255"));
    grain = parseInt(await laden("grain","255"));
    blue = parseInt(await laden("blue","255"));
    //hex_farbe = laden("hex_farbe","#ffffff");
    hex_farbe = rgbToHex(red, grain, blue);
    document.getElementById("btn_colorpicker").innerHTML ='<div slot="icon" class="icon"><svg height="20" viewBox="0 0 20 20" width="20" slot="icon" focusable="false" aria-hidden="true" role="img"><rect x="0" y="0" width="20" height="20" style="fill:'+hex_farbe+';"/></svg></div>'+label_rahmenfarbe;
    
    
    await require("photoshop").core.executeAsModal(function(){fordergrundfarbe_setzen(red,grain,blue);});
}

autostart();
async function rand_reset(){
    document.getElementById("FQ-rand-slider").value=10;
    red=255;grain=255;blue=255;
    await require("photoshop").core.executeAsModal(function(){fordergrundfarbe_setzen(red,grain,blue);});
    speichern("red",red);
    speichern("blue",blue);
    speichern("grain",grain);
    hex_farbe = rgbToHex(red, grain, blue);
    await speichern("hex_farbe", hex_farbe);
    document.getElementById("btn_colorpicker").innerHTML ='<div slot="icon" class="icon"><svg height="20" viewBox="0 0 20 20" width="20" slot="icon" focusable="false" aria-hidden="true" role="img"><rect x="0" y="0" width="20" height="20" style="fill:'+hex_farbe+';"/></svg></div>'+label_rahmenfarbe;
}

async function colorpick(){
    const color_red = red;
    const color_grain = grain;
    const color_blue = blue;
    const openPicker = {
        _target: { _ref: "application" },
        _obj: "showColorPicker",
        context: "Randfarbe auswählen",
        color: {
          _obj: 'RGBColor',
          red: color_red,
          green: color_grain,
          blue: color_blue,
        },
    };
    const res = await require("photoshop").action.batchPlay([openPicker], {});
    const rgbFloat = res[0].RGBFloatColor;
   
    
    red = parseInt(rgbFloat.red.toFixed(0));
    blue = parseInt(rgbFloat.blue.toFixed(0));
    grain = parseInt(rgbFloat.grain.toFixed(0));

   
    speichern("red",red);
    speichern("blue",blue);
    speichern("grain",grain);
    
    await fordergrundfarbe_setzen(red,grain,blue);
    
   
    hex_farbe = rgbToHex(red, grain, blue);
    await speichern("hex_farbe", hex_farbe);
    document.getElementById("btn_colorpicker").innerHTML ='<div slot="icon" class="icon"><svg height="20" viewBox="0 0 20 20" width="20" slot="icon" focusable="false" aria-hidden="true" role="img"><rect x="0" y="0" width="20" height="20" style="fill:'+hex_farbe+';"/></svg></div>'+label_rahmenfarbe;
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}    
async function fordergrundfarbe_setzen(r,g,b){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [
    {
        "_obj": "set",
        "_target": [
            {
                "_ref": "color",
                "_property": "foregroundColor"
            }
        ],
        "to": {
            "_obj": "RGBColor",
            "red": parseInt(r),
            "grain": parseInt(g),
            "blue": parseInt(b)
        },
        "source": "photoshopPicker",
        "_isCommand": true,
        "_options": {
            "dialogOptions": "dontDisplay"
        }
    }
    ],{
    "synchronousExecution": false
    
    });
    loop="fordergrundfarbe_setzen";
}

document.getElementById("btn_colorpicker").addEventListener("click",function(){require("photoshop").core.executeAsModal(colorpick);});
document.getElementById("switch_kopie").addEventListener("click",switch_kopie_check);
document.getElementById("btn_rand_reset").addEventListener("click",rand_reset);