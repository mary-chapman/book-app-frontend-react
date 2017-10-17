let BOOKS = [{title:"The Great Gatsby"}, {title: "Oliver Twist"}]

class BookList extends React.Component {
    constructor(props) {
        super(props)

        this.addBook = this.addBook.bind(this);
    }
    addBook(userInput) {
        if (userInput.length > 0) {
            BOOKS.push({title: userInput})
        }
        this.userInput.value = "";
        this.forceUpdate();
    }
    render() {
        return (

            <div className="container">

                <h1>READING LIST</h1>

                <div className="addForm">
                    <input ref={(input)=> this.userInput = input}/>
                    <button onClick={()=> this.addBook(this.userInput.value)}>ADD</button>
                </div>

                {BOOKS.map((book, index) => { 
                    return ( 
                        <div key={index} className="listItem">
                            <BookItem title={book.title} index={index} updateList={()=> this.forceUpdate() }/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

class BookItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isEditing: false }
    }
    deleteItem(index) {
        BOOKS = BOOKS.filter((x, i) => index != i )
        console.log(BOOKS)
    }
    saveEdit(userInput, index) {
        BOOKS[index] = {title: userInput}
        this.setState({ isEditing: false })
    }
    renderEditMode() {
        return (
            <div>
                <input defaultValue={this.props.title} ref={(input) => this.userInput = input} />
                <button 
                    onClick={()=>{ 
                        this.saveEdit(this.userInput.value, this.props.index); 
                        this.props.updateList()} 
                    }>SAVE</button> 
                <button onClick={()=>{ this.setState({isEditing:false})}}>CANCEL</button>
            </div>
        )
    }
    renderReadMode() {
        return (
            <div>
                <h2>{`${this.props.index + 1}. ${this.props.title}`}</h2>
                <button onClick={()=>this.setState({isEditing:true})}>EDIT</button>
                <button onClick={()=> {
                    this.deleteItem(this.props.index);
                    this.props.updateList() }
                }>DEL</button>
            </div>
        )
    }
    render() {
        if (!this.state.isEditing) {
            return <div>{this.renderReadMode()}</div>
        } else {
            return <div>{this.renderEditMode()}</div>
        }
    }
}

ReactDOM.render(
    <BookList />,
    document.getElementById("root")
)
