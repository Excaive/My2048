import QtQuick 2.12

Rectangle
{
    id: container

    property string text: "Button"
    property color buttonColor1: "#87CEFF"
    property color buttonColor2: "#B0E2FF"
    property color textColor: "#666666"

    signal clicked

    width: 100
    height: 30
    antialiasing: true
    radius: height / 2

    gradient:
        Gradient
        {
            GradientStop
            {
                position: 0.0
                color:
                {
                    if (mouseArea.pressed)
                        return buttonColor2
                    else
                        return buttonColor1
                }
            }
            GradientStop
            {
                position: 1.0
                color: buttonColor2
            }
        }

    MouseArea
    {
        id: mouseArea
        anchors.fill: parent
        onClicked: container.clicked();
    }

    Text
    {
        id: buttonLabel
        anchors.centerIn: container
        color: textColor
        font.family: "Century"
        font.pixelSize: 15
        text: container.text
    }
}
