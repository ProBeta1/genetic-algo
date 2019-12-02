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
                boxClass = this.props.cur[i][j]? ( (this.props.cur[i][j]===1)?"box one":"box two" ):"box off";

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

        return(
            <div className="par1">
                {rowsArr}

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
                    
                    <button className = "button" onClick = {this.props.run}>
                        Run
                    </button>
                    
            </div>


        );
    }
}

class Main extends React.Component{

    constructor(){
        super();
        this.rows=60;
        this.columns=100;
        this.state = {
            cur : Array(this.rows).fill().map(()=> Array(this.columns).fill(false)),
            str : [],
            xcord : 0,
            ycord : 0
        };
    }

    
    seed = ()=> {
        let g1 = Array(this.rows).fill().map(()=> Array(this.columns).fill(false))
        let t = 1;
        let i,j;
        let ar = [];
        for ( j = 0 ; j < this.columns ; j++){
            let x = Math.floor(Math.random() * (this.rows-5));
            ar.push(x);
            for( i = this.rows - 1 ; i >=x ; i--){
                g1[i][j] = 1;
            }
        }

        this.setState({
            cur : g1,
            str : ar,
            xcord : 0,
            ycord : 0
        });
    }

    run = ()=>{
        let ar = this.state.str;
        console.log("ayoo");
        let t  = 100;
        console.log(this.state.xcord);
        console.log(this.state.ycord);

            let x = this.state.xcord;
            let y = this.state.ycord;

            let rn = ar[ y ];
            let left = ar[ y>0 ? y - 1 : y ];
            let right = ar[ y < this.columns ? y + 1 : y ];

            let dx = (left- rn);
            let dy = (right - rn);

            let g1 = arrayClone(this.state.cur);
            if(dx > dy){
                if( dx > 0 && left !== y){
                    g1[left][y-1] = 2;
                    this.setState({
                        pos : left,
                        cur : g1,
                        xcord : left,
                        ycord : y-1
                    })
                }
            }
            else if(dy > 0 && dy !== y ){
                g1[right][y+1] = 2;
                this.setState({
                    pos : right,
                    cur : g1,
                    xcord : right,
                    ycord : y+1
                })
            }
    }

    componentDidMount(){
        this.seed();
    }

    selectBox = (row,col)=>{
        let gridCopy = arrayClone(this.state.cur);
        gridCopy[row][col] = 2;
        console.log(row);
        this.setState({
            cur : gridCopy,
            xcord : row,
            ycord : col
        });

    }

    render(){
        return(
            <div>
                <h1>Hill Descending</h1>
                <Buttons
                    seed = {this.seed}
                    run = {this.run}
                />
                
                <Grid
                    cur = {this.state.cur}
                    rows= {this.rows}
                    columns = {this.columns}
                    selectBox = {this.selectBox}                    
                />
             
                < a href = "https://en.wikipedia.org/wiki/Hill_climbing" class = "button1">Take me to Wiki</a>

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



