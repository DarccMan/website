function reset() {
  if (F.ls("cam") && F.isJSON(F.ls("cam"))) {
    cam = JSON.parse(F.ls("cam"));
    doc.id("x").value = cam.x;
    doc.id("y").value = cam.y;
    doc.id("z").value = cam.z;
  }

  gameState = "play";
}