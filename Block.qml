import QtQuick 2.12

Item
{
    id: img
    property int size: 100 //gameCanvas.blockSize
    property int type: 1
    property var colorlist: ["#FFFFFF", "#87CEEB", "#87EBE2", "#87EB8C", "#B1EB87", "#E0EB87",
                             "#EBDD87", "#EBBE87", "#EB9687", "#EB8795", "#EB87B6", "#EB87DD"]
    property bool spawned: false
    property bool dying: false

    width: size
    height: size

    opacity: 0

    Behavior on opacity
    {
        NumberAnimation { properties: "opacity"; duration: 300 }
    }

    Behavior on x
    {
        enabled: spawned
        SmoothedAnimation { velocity: 500 }
    }

    Behavior on y
    {
        enabled: spawned
        SmoothedAnimation { velocity: 500 }
    }

    Rectangle
    {
        id: block
        width: size * 0.9
        height: size * 0.9
        radius: size * 0.1
        color: colorlist[type]
        anchors.centerIn: parent

        Text
        {
            id: blockLabel
            anchors.centerIn: parent
            color: "white"
            font.family: "Century"
            font.pixelSize: 32
            text: (type == 0)? "" : Math.pow(2, type)
        }
    }

    states:
    [
        State
        {
            name: "AliveState"
            when: spawned == true && dying == false
            PropertyChanges { target: img; opacity: 1 }
        },

        State
        {
            name: "DeathState"
            when: dying == true
            PropertyChanges { target: img; opacity: 0 }
            StateChangeScript { script: block.destroy(1000); }
        }
    ]
}
