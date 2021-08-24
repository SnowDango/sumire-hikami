import React,{Component} from "react";

export interface Props {
  title: string;
  lang: string;
}

export default class App extends Component<Props> {
  render() {
    return <div>Hello from React! Title: {this.props.title}</div>;
  }
}