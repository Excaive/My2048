var maxColumn = 4;
var maxRow = 4;
var maxIndex = maxColumn * maxRow;
var board = new Array(maxIndex).fill(null);
var component;

function index(column, row)
{
    return column + (row * maxColumn);
}

function getRow(pos)
{
    return Math.floor(pos / maxColumn);
}

function getColumn(pos)
{
    return pos % maxColumn;
}

function startNewGame()
{
    //Delete blocks from previous game
    for (var i = 0; i < maxIndex; i++)
    {
        if (board[i] != null)
        {
            board[i].dying = true;
            //board[i].destroy();
        }
    }

    dialog.hide()
    scoreBar.score = 0;

    //Initialize Board
    board = new Array(maxIndex).fill(null);
    createBlock();
    createBlock();
}

function createBlock()
{
    var nullList = new Array;
    for (var i = 0; i < maxIndex; i++)
        if (board[i] == null)
            nullList.push(i);
    if (nullList.length > 0)
    {
        var pos = nullList[Math.floor(Math.random() * nullList.length)];


        var row = getRow(pos);
        var column = getColumn(pos);

        if (component == null)
            component = Qt.createComponent("Block.qml");

        if (component.status == Component.Ready)
        {
            var dynamicObject = component.createObject(gameCanvas);
            if (dynamicObject == null)
            {
                console.log("error creating block");
                console.log(component.errorString());
                return false;
            }
            dynamicObject.type = Math.floor(1 + Math.random() * 1.5)
            dynamicObject.x = column * gameCanvas.blockSize;
            dynamicObject.y = row * gameCanvas.blockSize;
            dynamicObject.width = gameCanvas.blockSize;
            dynamicObject.height = gameCanvas.blockSize;
            dynamicObject.spawned = true;
            gameCanvas.focus = true;
            board[index(column, row)] = dynamicObject;
        } else {
            console.log("error loading block component");
            console.log(component.errorString());
            return false;
        }
        return true;
    }
}

function moveUp()
{
    var moved = false;
    for (var column = 0; column < maxColumn; column++)
    {
        var moveDist = 0;
        var type = null;
        for (var row = 0; row < maxRow; row++)
        {
            if (board[index(column, row)] == null)
                moveDist += 1;
            else if (board[index(column, row)].type == type)
            {
                moveDist += 1;
                var movingObj = board[index(column, row)];
                var dyingObj = board[index(column, row - moveDist)];
                movingObj.y = (row - moveDist) * gameCanvas.blockSize;
                scoreBar.score += Math.pow(2, movingObj.type);
                movingObj.type += 1;
                dyingObj.dying = true;
                board[index(column, row)] = null;
                board[index(column, row - moveDist)] = movingObj;
                moved = true;
                type = null;
            }
            else if (moveDist > 0)
            {
                movingObj = board[index(column, row)];
                movingObj.y = (row - moveDist) * gameCanvas.blockSize;
                board[index(column, row)] = null;
                board[index(column, row - moveDist)] = movingObj;
                moved = true;
                type = movingObj.type;
            }
            else
                type = board[index(column, row)].type;
        }
    }
    if (moved)
        createBlock();
}

function moveDown()
{
    var moved = false;
    for (var column = 0; column < maxColumn; column++)
    {
        var moveDist = 0;
        var type = null;
        for (var row = maxRow - 1; row >= 0; row--)
        {
            if (board[index(column, row)] == null)
                moveDist += 1;
            else if (board[index(column, row)].type == type)
            {
                moveDist += 1;
                var movingObj = board[index(column, row)];
                var dyingObj = board[index(column, row + moveDist)];
                movingObj.y = (row + moveDist) * gameCanvas.blockSize;
                scoreBar.score += Math.pow(2, movingObj.type);
                movingObj.type += 1;
                dyingObj.dying = true;
                board[index(column, row)] = null;
                board[index(column, row + moveDist)] = movingObj;
                moved = true;
                type = null;
            }
            else if (moveDist > 0)
            {
                movingObj = board[index(column, row)];
                movingObj.y = (row + moveDist) * gameCanvas.blockSize;
                board[index(column, row)] = null;
                board[index(column, row + moveDist)] = movingObj;
                moved = true;
                type = movingObj.type;
            }
            else
                type = board[index(column, row)].type;
        }
    }
    if (moved)
        createBlock();
}

function moveLeft()
{
    var moved = false;
    for (var row = 0; row < maxRow; row++)
    {
        var moveDist = 0;
        var type = null;
        for (var column = 0; column < maxColumn; column++)
        {
            if (board[index(column, row)] == null)
                moveDist += 1;
            else if (board[index(column, row)].type == type)
            {
                moveDist += 1;
                var movingObj = board[index(column, row)];
                var dyingObj = board[index(column - moveDist, row)];
                movingObj.x = (column - moveDist) * gameCanvas.blockSize;
                scoreBar.score += Math.pow(2, movingObj.type);
                movingObj.type += 1;
                dyingObj.dying = true;
                board[index(column, row)] = null;
                board[index(column - moveDist, row)] = movingObj;
                moved = true;
                type = null;
            }
            else if (moveDist > 0)
            {
                movingObj = board[index(column, row)];
                movingObj.x = (column - moveDist) * gameCanvas.blockSize;
                board[index(column, row)] = null;
                board[index(column - moveDist, row)] = movingObj;
                moved = true;
                type = movingObj.type;
            }
            else
                type = board[index(column, row)].type;
        }
    }
    if (moved)
        createBlock();
}

function moveRight()
{
    var moved = false;
    for (var row = 0; row < maxRow; row++)
    {
        var moveDist = 0;
        var type = null;
        for (var column = maxColumn - 1; column >= 0; column--)
        {
            if (board[index(column, row)] == null)
                moveDist += 1;
            else if (board[index(column, row)].type == type)
            {
                moveDist += 1;
                var movingObj = board[index(column, row)];
                var dyingObj = board[index(column + moveDist, row)];
                movingObj.x = (column + moveDist) * gameCanvas.blockSize;
                scoreBar.score += Math.pow(2, movingObj.type);
                movingObj.type += 1;
                dyingObj.dying = true;
                board[index(column, row)] = null;
                board[index(column + moveDist, row)] = movingObj;
                moved = true;
                type = null;
            }
            else if (moveDist > 0)
            {
                movingObj = board[index(column, row)];
                movingObj.x = (column + moveDist) * gameCanvas.blockSize;
                board[index(column, row)] = null;
                board[index(column + moveDist, row)] = movingObj;
                moved = true;
                type = movingObj.type;
            }
            else
                type = board[index(column, row)].type;
        }
    }
    if (moved)
        createBlock();
}

function check()
{
    var full = true;
    var gameOver = true;
    for (var i = 0; i < maxIndex; i++)
    {
        if (board[i] != null)
        {
            if (board[i].type == 11)
            {
                gameCanvas.focus = false;
                dialog.show("You win!")
            }
        }
        else
            full = false;
    }
    if (full)
    {
        for (var column = 0; column < maxColumn - 1; column++)
            for (var row = 0; row < maxRow; row++)
            {
                if (board[index(column, row)].type == board[index(column + 1, row)].type)
                    gameOver = false;
            }

        for (column = 0; column < maxColumn; column++)
            for (row = 0; row < maxRow - 1; row++)
            {
                if (board[index(column, row)].type == board[index(column, row + 1)].type)
                    gameOver = false;
            }
        if (gameOver)
        {
            gameCanvas.focus = false;
            dialog.show("Game over!")
        }
    }
}
