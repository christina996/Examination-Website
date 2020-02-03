var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
document.getElementById("start").addEventListener("click",function()
{
    var x = "?" + queryString;
    window.location.href = "index2.html" + x;
});