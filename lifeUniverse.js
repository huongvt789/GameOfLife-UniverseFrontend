let UniverseModel = (function () {
    let model = {};

    model.universeMapNumber = [];
    model.universeString = '';
    model.x = 0;
    model.y = 0;

    model.createRandomMap = function (x, y) {
        model.x = x;
        model.y = y;

        for (let i = 0; i <= model.x; i++) {
            model.universeMapNumber[i] = [];
            for (let j = 0; j <= model.y; j++) {
                model.universeMapNumber[i][j] = Math.round(Math.random());
            }
        }
    };

    model.toHtmlString = function () {
        model.universeString = '';
        for (let i = 0; i < model.x; i++) {
            model.universeString += `<div class="grid">`;
            for (let j = 0; j < model.y; j++) {
                let cellType = model.universeMapNumber[i][j] === 1 ? 'planet' : 'space';
                model.universeString += `<div class="` + cellType + `"></div>`;
            }
            model.universeString += `</div>`;
        }

        return model.universeString;
    };

    model.evolve = function (time = 1) {
        for (let i = 1; i <= time; i++) {
            model.nextTime();
        }
    };

    model.nextTime = function () {
        let nextUniverse = this;
        for (let i = 0; i < nextUniverse.x; i++) {
            for (let j = 0; j < nextUniverse.y; j++) {
                nextUniverse.calculateCellState(i, j, model.countNeighborPlanet(i, j));
            }
        }

        model.universeMapNumber = nextUniverse.universeMapNumber;
        return model.toHtmlString();
    };

    model.calculateCellState = function (x, y, numberOfNeighbor) {
        if (numberOfNeighbor < 2 || numberOfNeighbor > 3) {
            model.universeMapNumber[x][y] = 0;
        } else if (3 === numberOfNeighbor) {
            model.universeMapNumber[x][y] = 1;
        }
    };

    model.countNeighborPlanet = function (i, j) {
        return model.getValueOfCell(i - 1, j - 1) + model.getValueOfCell(i - 1, j) + model.getValueOfCell(i - 1, j + 1)
            + model.getValueOfCell(i, j - 1) + model.getValueOfCell(i, j + 1)
            + model.getValueOfCell(i + 1, j - 1) + model.getValueOfCell(i + 1, j) + model.getValueOfCell(i + 1, j + 1);
    };

    model.getValueOfCell = function (x, y) {
        if (x < 0 || x >= model.x || y < 0 || y >= model.y) {
            return 0;
        }

        return model.universeMapNumber[x][y];
    };

    return model;
})();
