# pagination
simple jQuery pagination class

Using data-pages attribute
<pre>
&lt;div id="pagination" data-pages='{"page":1,"pages":10,"linkscount":3}'&gt;&lt;/div&gt;
$("#pagination").paginate();
</pre>

Using parameters passed (links count not available)
<pre>
&lt;div id="pagination_1" &gt;&lt;/div&gt;
$("#pagination_1").paginate(1, 10);
</pre>
    
Using Object parameter
<pre>
&lt;div id="pagination_2" &gt;&lt;/div&gt;
$("#pagination_2").paginate({page:1, pages:10, linkscount: 3});
</pre>
    
</div>
