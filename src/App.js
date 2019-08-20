import React, {Component} from 'react';
import Phrase from './Phrase'
import './App.css';

class App extends Component {
  state = {
    phrase: 'ARBRE',
    letters: ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split(""),
    usedLetters: new Set(),
    score: 0,
  }

  computeDisplay() {
    const {phrase, usedLetters} = this.state
    return phrase.replace(/\w/g,
      (letter) => usedLetters.has(letter) ? letter : '_' 
    )
  }

  handleClick = letter => {
    let {usedLetters} = this.state
    if (!usedLetters.has(letter))
      usedLetters.add(letter)
    this.setState({usedLetters: usedLetters})
    this.updateScore()
  }

  disableLetter = (letter) => {
    const {usedLetters} = this.state
    return usedLetters.has(letter) ? 'disabled' : ''
  }

  resetGame() {
    this.setState({usedLetters: new Set()})
  }

  userHasWin() {
    return this.state.phrase === this.computeDisplay()
  }

  updateScore() {
    if ( this.userHasWin() ) {
      const {score} = this.state
      const newScore = score + 1;
      this.setState({score: newScore})
    }
  }

  displayResetButton() {
    if ( !this.userHasWin() ) {
      return 'hidden'
    }
  }

  render() {
    const {letters, usedLetters, score} = this.state
    return (
      <main role="main">
        <h1>Jeu du pendu</h1>
        <h2>Score : {score}</h2>
        <Phrase className="phrase" phrase={this.computeDisplay()} />
        <div className="keyboard">
          {
            letters.map( letter => (
              <button 
                className="keyboard__letter"
                key={letter} 
                onClick={() => this.handleClick(letter, usedLetters)} 
                disabled={this.disableLetter(letter)}>
                {letter}
              </button>
            ) ) 
          }
          <button 
            hidden={this.displayResetButton()} 
            onClick={() => this.resetGame()}>
            RESET
          </button>
        </div>
      </main>
    )
  }
}

export default App;
