
function videoPlay() {
	document.querySelector(".aboutVideoCover").style.display = "none";
	document.querySelector(".aboutVideoIframe").src += "&autoplay=1";	
}

document.querySelector(".aboutVideoCover").addEventListener("click", videoPlay);