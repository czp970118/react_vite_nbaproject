import React from "react";

export default class Test extends React.Component {
   constructor(props: any) {
      super(props);
      this.state = {
         count: 0,
      };
   }

   componentDidMount(): void {
      this.setState({ count: this.state.count + 1 });
      console.log("test中第一次count", this.state.count);
      this.setState({ count: this.state.count + 1 });
      console.log("test中第二次count", this.state.count);
      setTimeout(() => {
         this.setState({ count: this.state.count + 1 });
         console.log("test中第三次count", this.state.count);
         this.setState({ count: this.state.count + 1 });
         console.log("test中第四次count", this.state.count);
      }, 0);
   }

   handleClick = () => {
      this.setState({ count: this.state.count + 1 });
      console.log("test中第一次count", this.state.count);
      this.setState({ count: this.state.count + 1 });
      console.log("test中第二次count", this.state.count);
      setTimeout(() => {
         this.setState({ count: this.state.count + 1 });
         console.log("test中第三次count", this.state.count);
         this.setState({ count: this.state.count + 1 });
         console.log("test中第四次count", this.state.count);
      }, 0);
   };

   render(): React.ReactNode {
      return (
         <div style={{ fontSize: 24, marginTop: 12, marginBottom: 12 }}>
            <span onClick={this.handleClick}>Count:</span>
            {this.state.count}
         </div>
      );
   }
}
