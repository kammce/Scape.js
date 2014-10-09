$(function() {
	console.log("home got loaded!");

	var template = $("#item-template").html();
	var compiler = _.template(template);
	var list = ["Apple", "Becka", "Charles", "Donald", "Eva"];
	var html = "";
	for (var i = list.length - 1; i >= 0; i--) {
		var row = { index: i, name: list[i] };
		html = compiler(row)+html;
	};
	$("#tbody").html(html);
	
	$("button.clicker").on("click", function() {
		console.log("this is sparta!!");
		app.communication.request("server-side/server.php",
			"setName", {
				fname: "kammce",
				lname: "lilahkia"
			},
			function success(data) {
				alert("name set to kammce");
			}
		);
	});
});