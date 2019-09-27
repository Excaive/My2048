import QtQuick 2.12
import "My2048.js" as My2048

Rectangle
{
    id: screen
    width: 440
    height: 640
    color: "#E8E8E8"

    Item
    {
        id: scoreBar
        width: 400
        height: 40
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.bottom: gameCanvas.top
        anchors.margins: 20

        property int score: 0

        Text
        {
            id: score
            color: "black"
            font.family: "Century"
            font.pixelSize: 28
            anchors
            {
                right: parent.right
                margins: 10
            }
            text: "Score:  " + scoreBar.score
        }
    }

    Item
    {
        id: gameCanvas
        width: 400
        height: 400
        anchors.centerIn: parent

        property int blockSize: 100

        Flow
        {
            anchors.fill: parent

            Repeater
            {
                model: 16
                Block
                {
                    type: 0
                    opacity: 0.7
                }
            }
        }

        focus: false        
        Keys.onUpPressed:    { My2048.moveUp();    My2048.check() }
        Keys.onDownPressed:  { My2048.moveDown();  My2048.check() }
        Keys.onLeftPressed:  { My2048.moveLeft();  My2048.check() }
        Keys.onRightPressed: { My2048.moveRight(); My2048.check() }
    }

    Dialog
    {
        id: dialog
        anchors.centerIn: parent
    }

    Item
    {
        id: toolBar
        width: 400
        height: 100
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.bottom: screen.bottom

        Button {
            anchors
            {
                //left: parent.left
                //verticalCenter: parent.verticalCenter
                centerIn: parent
            }
            text: "New Game"
            onClicked: My2048.startNewGame()
        }
    }
}
