
// from Ingrid 31/1 2017
var InvoiceForm = function(){

    var articles;

    this.bufferArticles = function(arg){
        articles = arg;
    }

    this.setDate = function(val){
        element("date").value = val;
    }


    this.setArticles = function(val){
        /* array of {
            id, name, spec, units, price, vat
        }*/
        var list = element("articles")
        
        while (list.firstChild){
            list.removeChild(list.firstChild);
        }

        for(var i = 0; i<val.length; i++){
            list.appendChild(buildArticle(val[i]));
        }

        var addNewArticleRow = document.createElement('tr');
        var addNewButton = document.createElement('button');
        addNewButton.innerHTML = "Lägg till";
        addNewButton.addEventListener('click', function(e){
            addArticle();
        })
        addNewArticleRow.appendChild(addNewButton);
        list.appendChild(addNewArticleRow);
    }

    /***/

    element("ourRepList").addEventListener('change', function(e){
        console.log(e.target.value);
        console.log(e.target.selectedIndex);
    })

    function buildArticle(val){

        var articleRow = document.createElement('tr');
        var specInput = document.createElement('input');
        var unitsInput = document.createElement('input');
        var priceInput = document.createElement('input');
        var vatInput = document.createElement('input');
        var deleteButton = document.createElement('button');

        articleRow.appendChild(document.createElement('td').appendChild(buildSelect(articles)));
        specInput.value = val.spec;
        specInput.innerHTML = val.spec;
        articleRow.appendChild(document.createElement('td').appendChild(specInput));
        unitsInput.value = val.units;
        unitsInput.innerHTML = val.units
        articleRow.appendChild(document.createElement('td').appendChild(unitsInput));
        priceInput.value = val.price;
        priceInput.innerHTML = val.price;
        articleRow.appendChild(document.createElement('td').appendChild(priceInput));
        vatInput.value = val.vat;
        vatInput.innerHTML = val.vat;
        articleRow.appendChild(document.createElement('td').appendChild(vatInput));
        deleteButton.innerHTML = "Radera"
        deleteButton.artID = val.id;

        // remove article
        deleteButton.addEventListener('click', function(e){
            articleList = element("articles");
            articleList.deleteRow(e.target.parentElement);
        })
        articleRow.appendChild(document.createElement('td').appendChild(deleteButton));

        return articleRow;
    }
    function addArticle(){
        articleList = element("articles");
        var len = articleList.rows.length;
        var addRow = articleList.rows[len-1];
        articleList.deleteRow(len-1);
        articleList.appendChild(buildArticle({
                id          : len-1,
                articleList : articles,
                spec        : "",
                units       : 1,
                price       : 0,
                vat         : 25
            }))
        articleList.appendChild(addRow);
    }

    function buildSelect(val,selectedId){
        var select = document.createElement('select');  
        for(var i=0;i<val.length;i++){
            var option = document.createElement('option');
            option.value = val[i];
            option.innerHTML = val[i];
            select.appendChild(option);
        }
        if(selectedId) {
            select.selectedId = selectedId;
            select.value = val[selectedId];
        }
        return select;
    }

    function element(id){
        return document.getElementById(id);
    }


    this.setOurRepList = function(val){
        // val = [strings]
        var list = element("ourRepList");
        while (list.firstChild){
            list.removeChild(list.firstChild);
        }
        for(var i = 0; i<val.length; i++){
            var option = document.createElement('option');
            option.value = val[i];
            option.innerHTML = val[i];
            list.appendChild(option);
        }
    }

    this.addToOurRepList = function(val){
        // val = as string
        var option = document.createElement('option');
        option.value = val;
        option.innerHTML = val;
        element("ourRepList").appendChild(option);
    }

    this.setList = function(arg){
        // val = [strings]
        var list = element(arg.listId);
        while (list.firstChild){
            list.removeChild(list.firstChild);
        }
        for(var i = 0; i<arg.list.length; i++){
            var option = document.createElement('option');
            option.value = arg.list[i];
            option.innerHTML = arg.list[i];
            list.appendChild(option);
        }
    }

    this.addToList = function(arg){
        // val = as string
        var option = document.createElement('option');
        option.value = arg.name;
        option.innerHTML = arg.name;
        element(arg.listId).appendChild(option);
    }
    
}