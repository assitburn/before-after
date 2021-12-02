var ebene_original = "";
var ebene_bearbeitet = "";
var label_zusammengefasst = "zusammengefasst-fuer-vorher-nachher";
var label_layerneu = "Vorher-Nachher";
var layercount = 0;
var label_alle_ebenen_auswaehlen = "alle Ebenen ausgewählt";
var label_in_neue_datei_kopieren = "in neue Datei kopiert";
var label_rahmen_hinzufuegen = "Rahmen hinzugefügt";
var hintergrund_vorhanden = "";
var original_document = 0;
var neues_document = 0;
var label_32bitohneunterstützung = "keine 32 Bit Unterstützung";
var label_kein_doc_geladen = "kein Dokument geladen";
var label_nur_rgb_farbraum = "nur RGB-Farbraum wird unterstützt";
var rand = 10;
var rand2 = rand * 2;
var red = 255;
var blue = 255;
var grain = 255;
var hex_farbe = "";
var loop = "0";
var pixelchange = false;
var document_hoehe = 0;
var document_breite = 0;
var richtung = "";
var label_rahmenfarbe = "Rahmenfarbe";
var label_rechts_oben = "Original links / unten";
var label_links_unten = "Original rechts / oben";
var label_kopie_links = "Original wird rechts / oben angezeigt";
var label_kopie_rechts = "Original wird links / unten angezeigt";
var label_Ebenenauswahl_aufgehoben = "Ebenenauswahl aufgehoben";
var dateiname = "Vorher-Nachher";
var label_Querformat ="Querformat";
var label_portrait = "Portrait";
var label_pixel = " Pixel";
var label_bildgroesse = "Bildgröße ";


function sprache_auswählen(){
    const host = require('uxp').host;
    const locale = host.uiLocale;
    if (locale == "de_DE"){
        deutsch();
    }else{
        englisch();
    }
    sprache();
}
sprache_auswählen();
function deutsch(){

}
function englisch(){
    label_rechts_oben = "original on left / bottom";
    label_links_unten = "original on right / top"
    label_kopie_links = "original will be placed on the right / top";
    label_kopie_rechts = "original will be placed on the left / bottom";
    label_rahmenfarbe = "bordercolor";
    label_layerneu = "Before-After";
    label_Ebenenauswahl_aufgehoben = "Layers deselect";
    label_alle_ebenen_auswaehlen = "select all layers";
    label_zusammengefasst = "merged for before-after";
    dateiname = "Before-After";
    label_Querformat = "landscape";
    label_portrait = "portrait";
    label_pixel = " pixel";
    label_bildgroesse = "Picture-size ";

    label_32bitohneunterstützung = "no 32 bit Support";
    label_kein_doc_geladen = "no document loaded";
    label_nur_rgb_farbraum = "only RGB-Color is supported";

    document.getElementById("label_rand").innerHTML = "Border";
    document.getElementById("label_Randstaerke").innerHTML = "Border size in pixel";
    //document.getElementById("label_bildgroesse").innerHTML = "Picture size";
    //document.getElementById("switch_resize").innerHTML = "change size";
    //document.getElementById("label_laengsteSeite").innerHTML = "longest side (px)";
    document.getElementById("label_vorher_nachher").innerHTML = "Before-After";
    document.getElementById("btn_vorher_nachher").innerHTML = "Before-After";
    document.getElementById("switch_kopie").innerHTML = label_rechts_oben;
    document.getElementById("pixelgroesse").setAttribute("placeholder","longest side in pixel");
}