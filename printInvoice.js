var PrintInvoice = function(){

    var lMargin = 17;
    var rMargin = 195;
    var mMargin = 120;
    var tMargin = 20;
    var lineHeight = 5;
    var tab = 20;

    // Default export is a4 paper, portrait, using milimeters for units
    var doc = new jsPDF()
    this.print = function(){
        doc.lines([[rMargin-lMargin,0]],lMargin,tMargin + (17*lineHeight)-0.5);
        doc.lines([[rMargin-lMargin,0]],lMargin,tMargin + (46*lineHeight)-0.5);
        doc.lines([[rMargin-lMargin,0]],lMargin,tMargin + (50*lineHeight)-0.5);
        doc.save('a4.pdf')     
    }

    this.setSender = function(obj){
        doc.setFontSize(12);
        doc.textEx(obj.name, lMargin, (tMargin + (0*lineHeight)-0.5));
        doc.setFontSize(10);
        doc.textEx(obj.address1, lMargin, (tMargin + (1*lineHeight)));
        doc.textEx(obj.address2, lMargin, (tMargin + (2*lineHeight)));
        doc.textEx(obj.address3, lMargin, (tMargin + (3*lineHeight)));
        doc.textEx(obj.phone, lMargin, (tMargin + (4*lineHeight)));
        doc.textEx(obj.email, lMargin, (tMargin + (5*lineHeight)));
        doc.textEx(obj.www, lMargin, (tMargin + (6*lineHeight)));
        doc.textEx("Vår kontakt: "+obj.rep, lMargin+(6*tab), tMargin+(16*lineHeight));
    }
    this.setReceiver = function(obj){
        doc.setFontSize(10);
        doc.textEx(obj.name, mMargin, (tMargin + (7*lineHeight)));
        doc.textEx(obj.address1, mMargin, (tMargin + (8*lineHeight)));
        doc.textEx(obj.address2, mMargin, (tMargin + (9*lineHeight)));
        doc.textEx(obj.address3, mMargin, (tMargin + (10*lineHeight)));
        doc.textEx("Er kontakt: "+obj.rep, lMargin, tMargin+(16*lineHeight));
    }
    this.setMeta = function(obj){
        doc.setFontSize(14);
        doc.textEx("Faktura "+obj.invoiceNo, rMargin, tMargin-0.5, 'right');
        doc.setFontSize(10);
        doc.textEx(obj.date, rMargin, tMargin+6, 'right');
        doc.textEx("Betalningsvillkor: "+obj.credit, lMargin+(3*tab), tMargin+(16*lineHeight));
        doc.textEx("Betalas senast: "+obj.dueDate, lMargin+(0*tab), tMargin+(46*lineHeight));
    }
}

var splitRegex = /\r\n|\r|\n/g;
jsPDF.API.textEx = function (text, x, y, hAlign, vAlign) {
    var fontSize = this.internal.getFontSize() / this.internal.scaleFactor;

    // As defined in jsPDF source code
    var lineHeightProportion = 1.15;

    var splittedText = null;
    var lineCount = 1;
    if (vAlign === 'middle' || vAlign === 'bottom' || hAlign === 'center' || hAlign === 'right') {
        splittedText = typeof text === 'string' ? text.split(splitRegex) : text;

        lineCount = splittedText.length || 1;
    }

    // Align the top
    y += fontSize * (2 - lineHeightProportion);

    if (vAlign === 'middle')
        y -= (lineCount / 2) * fontSize;
    else if (vAlign === 'bottom')
        y -= lineCount * fontSize;

    if (hAlign === 'center' || hAlign === 'right') {
        var alignSize = fontSize;
        if (hAlign === 'center')
            alignSize *= 0.5;

        if (lineCount > 1) {
            for (var iLine = 0; iLine < splittedText.length; iLine++) {
                this.text(splittedText[iLine], x - this.getStringUnitWidth(splittedText[iLine]) * alignSize, y);
                y += fontSize;
            }
            return this;
        }
        x -= this.getStringUnitWidth(text) * alignSize;
    }

    this.text(text, x, y);
    return this;
};