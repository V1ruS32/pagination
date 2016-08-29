/**
 * Siple JS Pagination Class
 * Can be Used as jQuery extension
 * 
 * @author Giga Liqokeli
 *
 */


/**
 * 
 * @type Object 
 */
PAGINATION = {
    element : null,
    /**
     * 
     * @type Number
     * page count
     */
    pages : 0,
    /**
     * 
     * @type Number
     * current Page
     */
    page : 0,
    /**
     * 
     * @type Number
     * page links count to show
     */
    page_links_cnt : 5,
    setElem : function (element){
        if(typeof jQuery === 'undefined'){
            throw 'jQuery library is required';
            return;
        }
        this.element = jQuery(element);
        if(!this.element.length){
            throw 'Object element Not found';
        }
        return this;
    },
    setPageLinks : function(cnt){
        if(isNaN(cnt)){
            throw 'Page Links Count must be a Number';
        }
        this.page_links_cnt = cnt;  
    },
    init : function(page,pages){
        if(typeof(page) == 'undefined' || isNaN(page)){
            throw 'Current Page Is Not Defined';
        }
        if(typeof(pages) == 'undefined' || isNaN(pages)){
            throw 'Pages Full Count is not defined';
        }
        this.page  = page;
        this.pages = pages;
        if(typeof(this.element) == 'object'){
            var html = this.getPagination();
                this.element.html(html);
                this.bndLinks();
        }
        return this;
    },
    getPagination : function(){
       
        var html = '';
        var cur_page = parseInt(this.page);
        var pages = parseInt(this.pages);
        
            html += '<div class="Sp-pagination">'
            +'<span class="page_link page-first '+(cur_page == 1?'disable-nav':'')+'" data-page="1"><i class="-icon-backward"></i></span><span class="page_link page-prev '+(cur_page == 1?'disable-nav':'')+'" data-page="'+(cur_page-1)+'"><i class="-icon-step-backward"></i></span>';
        var i = 1;
        
        var html_end =  '<span class="page_link page-next '+(cur_page == pages?'disable-nav':'')+'" data-page="'+(cur_page+1)+'"><i class="-icon-step-forward"></i></span><span class="page_link page-last '+(cur_page == pages?'disable-nav':'')+'" data-page="'+(pages)+'"><i class="-icon-forward"></i></span>';
            html_end += '</div>';
        
        if(pages > this.page_links_cnt){
            var middle = Math.ceil(this.page_links_cnt/2);
                if((cur_page) - (middle) > 0){
                    html += '<span class="page_link page-page disable-nav" >...</span>';
                    i = cur_page - (this.page_links_cnt - middle);
                }
                if((cur_page) + (middle-1) < pages){
                    html_end = '<span class="page_link page-page disable-nav" >...</span>'+html_end;
                    pages = i + this.page_links_cnt - 1;
                }else{
                    i = pages - this.page_links_cnt ;
                }
            
        }
        while(i <= pages){
            html += '<span class="page_link page-page '+(cur_page == i?'disable-nav':'')+'" data-page="'+i+'">'+(i)+'</span>';
            i++;
        }
        html += html_end;
        
        return html;
    },
    bndLinks : function(){
        var that = this;
        jQuery(".page_link").not(".disable-nav").click(function(e){
            e.preventDefault();
            var page = jQuery(this).attr('data-page');
            if(!isNaN(parseInt(page))){
                that.goto(page, that.page);
            }
        });
    },
    goto : function(page){
            page = parseInt(page);
            if(page > this.pages || page < 1){
                return;
            }
        var link = window.location.href;
        var newlink = link.replace(new RegExp(/(\?.*)/, ''),'')+'?';
        var GET = this.populateGet();
            for(var i in GET){
                if(i == 'page' || i == '' || GET[i] == 'undefined'){
                    continue;
                }else{
                    newlink += i+'='+GET[i]+'&';
                }
            }
            newlink +='page='+page;
            window.location.href = newlink;
    },
    populateGet : function(){
        var obj = {}, params = location.search.slice(1).split('&');
        for(var i=0,len=params.length;i<len;i++) {
            var keyVal = params[i].split('=');
            var l = decodeURIComponent(keyVal[0]);
                if(l.substr(l.length-2) == '[]'){
                    var obj_arr = obj[l.substr(0,l.length-2)];
                    if(obj_arr){
                        obj[l.substr(0,l.length-2)][obj_arr.length] = decodeURIComponent(keyVal[1]);
                    } else {
                        obj[l.substr(0,l.length-2)] = [decodeURIComponent(keyVal[1])];
                    }
                } else {
                    obj[decodeURIComponent(keyVal[0])] = decodeURIComponent(keyVal[1]);
                }
        }
        return obj;
    }
};
/**
 * 
 * set data attribute "data-pages" to string json {page: current page, pages: pages count} and call paginate on it 
 * Optionally you can define Page links Count with "linkscount" : 10;
 * 
 * data-pages='{"page":"1","pages":"10","linkscount":"5"}' OR Pass to function directly;
 * Example $("#pagination").paginate(1,10);
 * Example 2 $("#pagination").paginate({page:1,pages:10,linkscount:5});
 * 
 */
(function($){
    $.fn.paginate = function(page,pages){
        this.Pagination = this.Pagination || Object.create(PAGINATION);;
        try{
            var data = JSON.parse(this.attr('data-pages'));
        }catch(e){
            // console.log(e);
        }
        if(typeof(data) == 'object'){
            page = data;
        }
        if(typeof(page) == 'object'){
            pages = page.pages;
            if(typeof(page.linkscount) !== 'undefined'){
                this.Pagination.setPageLinks(page.linkscount);
            }
            page = page.page;
        }
        try{
            this.Pagination.setElem(this).init(page,pages);
        }catch(e){
           console.log(e);
        }
    }
})(jQuery);

