import gameConfig from 'configs/gameConfig';
import createNoteMap from 'utils/createNoteMap';
import getFunctionUsage from 'utils/getFunctionUsage';

const createMusicAnalyzer = function createMusicAnalyzerFunc() {
    const state = {};
    // let dataArray;
    let vis;
    const width = gameConfig.GAME.VIEWWIDTH;
    const height = gameConfig.GAME.VIEWHEIGHT / 2;
    const x = 0;
    const y = gameConfig.GAME.VIEWHEIGHT;
    const thickness = 3;
    const alpha = 1;
    const color = 0xdddddd;

    let freqMap = [];
    let currentIndex = 0;

    function drawSummary() {
        if (freqMap[currentIndex]) {
            vis.clear();
            vis.lineStyle(thickness, color, alpha);
            const dataArray = freqMap[currentIndex];
            const sliceWidth = (width * 1.0) / dataArray.length;
            vis.beginPath();
            for (let i = 0; i < dataArray.length; i += 1) {
                const v = dataArray[i];
                vis.lineTo(x + sliceWidth * i, y + v);
            }
            vis.strokePath();
            currentIndex += 1;
        } else {
            currentIndex = 0;
        }
    }

    function init(gameState) {
        vis = gameState.add.graphics();
        const { audioBuffer } = gameState.getAudioManager().getBackgroundMusic();
        freqMap = createNoteMap(audioBuffer);
        drawSummary();
    }

    function update() {
        drawSummary();
    }

    const localState = {
        // props
        // methods
        init,
        update,
    };

    const states = [{ state, name: 'state' }, { state: localState, name: 'localState' }];

    getFunctionUsage(states, 'createMusicAnalyzer');
    return Object.assign(...states.map(s => s.state), {
        // pipes and overrides
    });
};

export default createMusicAnalyzer;
