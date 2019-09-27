import QtQuick 2.12

Rectangle
{
    id: container

    function show(text)
    {
        dialogText.text = text;
        container.opacity = 1;
    }

    function hide()
    {
        container.opacity = 0
    }

    Behavior on opacity
    {
        NumberAnimation { properties: "opacity"; duration: 300 }
    }

    width: dialogText.width + 50
    height: dialogText.height + 20
    radius: height / 2
    color: "#88FFFFFF"
    opacity: 0
    visible: opacity > 0

    Text
    {
        id: dialogText
        anchors.centerIn: parent
        font.family: "Century"
        font.pixelSize: 28
        text: ""
    }

    MouseArea
    {
        anchors.fill: parent
        onClicked: hide()
    }
}
