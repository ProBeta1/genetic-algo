import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Box extends React.Component{

    selectBox = ()=>{
        this.props.selectBox(this.props.row,this.props.col);
    }
    render(){
        return(
            <div
                className = {this.props.boxClass}
                id = {this.props.id}
                onClick = {this.selectBox}
            />
        );
    }
}
class Grid extends React.Component{

    render(){

        const width = (this.props.columns * 56);
        var rowsArr = [];
        var boxClass = "";
        
        for(var i = 0; i < this.props.rows; i++ ){
            for(var j = 0; j < this.props.columns; j++){
                let boxId = i + "_" + j;
                boxClass = this.props.cur[i][j]?"box on ":((i+j)%2 ?'box blc':'box wht');

                rowsArr.push(
                    <Box 
                        boxClass = {boxClass}
                        key = {boxId}
                        boxId = {boxId}
                        row={i}
                        col={j}
                        selectBox = {this.props.selectBox}
                    />
                );
            }
        }
        var count = 0;
        let grid = arrayClone(this.props.cur);
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                if(grid[i][j] === false)
                    continue;
                
                for(let k = 0; k < 8; k++){
                    for(let z = 0 ; z < 8; z++){
                        if(i===k && j===z)
                            continue;
                        
                        if( (i===k) || (j===z) || (Math.abs(i-k)===Math.abs(j-z))){
                            ;
                        }
                        else{
                            if(grid[k][z] === true){
                                count++;
                            }
                        }
                    }
                }
                grid[i][j] = false;
    
            }
        }

        return(
            <div className="par1" style={{width:width}}>
                <p>{this.props.who}</p>
                {rowsArr}

                <h1>Fitness : {count} </h1>
            </div>
        );
    }
}
  

class Buttons extends React.Component{

    handleSelect= (evt)=>{
        this.props.gridSize(evt)
    }
    render(){
        return(
            <div className = "center">
                    <button className = "button" onClick = {this.props.seed}>
                        Generate New 
                    </button>
                    
                    <button className = "button" onClick = {this.props.cross}>
                        Perform Crossover
                    </button>
                    <button className = "button" onClick = {this.props.mutate}>
                        Mutate
                    </button>
                    <a href="https://www.memedroid.com/" class="button">Show Me a Meme</a>

                    
            </div>


        );
    }
}

class Main extends React.Component{

    constructor(){
        super();
        this.speed = 100;
        this.rows=8;
        this.columns=8;

        var g1 = Array(this.rows).fill().map(()=> Array(this.columns).fill(false))
        for(let i = 0; i < this.rows; i++){
            let mark = Math.floor(Math.random()*8 );
            g1[i][mark] = true;
        }

        var g2 = Array(this.rows).fill().map(()=> Array(this.columns).fill(false))
        for(let i = 0; i < this.rows; i++){
            let mark = Math.floor(Math.random()*8 );
            g2[i][mark] = true;
        }
        var g3 = Array(this.rows).fill().map(()=> Array(this.columns).fill(false))

        this.state = {
            generation :0,
            fitness : 0,
            father : g1,
            mother : g2,
            kid1 : g3,
            kid2 : g3,
            cur : g2,
            who : "none"
        }
    }

    
    seed = ()=> {
        let gridCopy1 = Array(this.rows).fill().map(()=> Array(this.columns).fill(false))
        for(let i = 0; i < this.rows; i++){
            let mark = Math.floor(Math.random()*8 );
            gridCopy1[i][mark] = true;
        }

        let gridCopy2 = Array(this.rows).fill().map(()=> Array(this.columns).fill(false))
        for(let i = 0; i < this.rows; i++){
            let mark = Math.floor(Math.random()*8 );
            gridCopy2[i][mark] = true;
        }

        let tmp = Array(this.rows).fill().map(()=> Array(this.columns).fill(false))

        this.setState({
            cur : gridCopy1,
            father : gridCopy1,
            mother : gridCopy2,
            kid1 : tmp,
            kid2 : tmp

        });
    }

    cross = ()=>{

        // working awesomely ... well done !!
        let pivot = Math.floor(Math.random() *7);
        let g = Array(this.rows).fill().map(()=> Array(this.columns).fill(false))
        let h = Array(this.rows).fill().map(()=> Array(this.columns).fill(false))

        let i,j;

        // kid1
        for( i = 0; i < 8 ; i++){
            if(i === pivot)
                break;
            for( j = 0; j < 8 ;j++){
                g[i][j] = this.state.father[i][j];
            }
        }
        for( ; i < 8 ; i++){
            for( j = 0; j < 8 ;j++){
                g[i][j] = this.state.mother[i][j];
            }
        }

        // kid2
        for( i = 0; i < 8 ; i++){
            if(i === pivot)
                break;
            for( j = 0; j < 8 ;j++){
                h[i][j] = this.state.mother[i][j];
            }
        }
        for( ; i < 8 ; i++){
            for( j = 0; j < 8 ;j++){
                h[i][j] = this.state.father[i][j];
            }
        }

        this.setState({
            kid1 : g,
            kid2 : h
        })

    }

    mutate = () =>{
        let i,j;
        let pivot1 = Math.floor(Math.random() *7);
        let pivot2 = Math.floor(Math.random() *7);

        let changeTo1 = Math.floor(Math.random() *7);
        let changeTo2 = Math.floor(Math.random() *7);

        let k1 = arrayClone(this.state.kid1);
        let k2 = arrayClone(this.state.kid2);

        for(i=0;i<8;i++){
            for(j=0;j<8;j++){
                if(i === pivot1 && this.state.kid1[i][j] === true){
                    k1[i][j] = false;
                }
                if(i === pivot1  && j ===changeTo1 ){
                    k1[i][j] = true;
                }
            }
        }

        for(i=0;i<8;i++){
            for(j=0;j<8;j++){
                if(i === pivot2 && this.state.kid2[i][j] === true){
                    k2[i][j] = false;
                }
                if(i === pivot2  && j ===changeTo2 ){
                    k2[i][j] = true;
                }
            }
        }

        this.setState({
            kid1 : k1,
            kid2 : k2,
            father : k1,
            mother : k2
        })

    }

    

    componentDidMount(){
        this.seed();
       // this.playButton();
    }


    render(){
        return(
            <div>
                <h1>Genetic Algorithm ( An Evolutionary Algorithm)</h1>
                <Buttons
                    seed = {this.seed}
                    cross = {this.cross}
                    mutate = {this.mutate}
                    fit = {this.fitness}
                />
                
                <Grid
                    cur = {this.state.father}
                    rows= {this.rows}
                    columns = {this.columns}
                    selectBox = {this.selectBox}
                    who = "Parent-1"
                    
                />
                <Grid
                    cur = {this.state.mother}
                    rows= {this.rows}
                    columns = {this.columns}
                    selectBox = {this.selectBox}
                    who = "Parent-2"

                />
                <Grid
                    cur = {this.state.kid1}
                    rows= {this.rows}
                    columns = {this.columns}
                    selectBox = {this.selectBox}
                    who = "Child-1"

                />
                <Grid
                    cur = {this.state.kid2}
                    rows= {this.rows}
                    columns = {this.columns}
                    selectBox = {this.selectBox}
                    who = "Child-2"

                />
             
             <a href="https://en.wikipedia.org/wiki/Genetic_algorithm" class="button1">Go to Wiki of GA</a>


            </div>
        );
    }
}


function arrayClone(arr){
    return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<Main/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA



