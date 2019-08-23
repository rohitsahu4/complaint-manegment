import React from "react";
import "./upload.css"
import Materialize from 'materialize-css';
export class ImgUpload extends React.Component {
   constructor() {
      super()
      this.state = {
         imageFile: null,
         displayDropper: false,
         opacity: false,
         imageDropped: false,
         imageSelected: false

      }
   }
   handleChange = (e) => {
      this.setState({ imageFile: e.target.files[0], imageDropped: true })
   }
   handleDrop = (event) => {
      event.preventDefault()
      event.persist()
      var file = event.dataTransfer.items[0].getAsFile()
      if (file.type.indexOf("image") === 0) {
         this.setState({ imageFile: file, imageDropped: true })
      }
      else {
         Materialize.toast({ html: "File is not An Image", classes: "orange" })
      }



   }

   onDragOver = (e) => {
      e.preventDefault()

   }
   submit = () => {
      this.props.SendToParent(this.props.FieldName, this.state.imageFile)
      this.ToggleDropper()
      this.setState({ imageSelected: true })
   }
   clear = () => {
      this.setState({
         imageFile: "",
         displayImage: false,
         imageDropped: false
      })
   }
   displayImage = () => {

      if (this.state.imageDropped) {

         var reader = new FileReader()
         reader.readAsDataURL(this.state.imageFile)
         reader.onloadend = () => {
            var url = reader.result;
            this.setState({ imgurl: url })
         }
         return (<div className="Dropper-inner" >
            <h5 className="center">  Image Preview </h5>
            <div><img style={{ height: "350px", marginTop: "10px", width: "auto" }} alt="" src={this.state.imgurl} /></div>
            <div className="btn white blue-text" style={{ marginRight: "100px" }} onClick={this.clear}>Clear</div><div className="btn center blue " onClick={this.submit}>OK</div>
         </div >)

      }
      else {
         return (<div className="Dropper-inner" >
            <div className="center " style={{ marginTop: "50%" }}><input accept="image/*" onChange={this.handleChange} type="file" id="file" className="file-input" /><label htmlFor="file" style={{ cursor: "pointer" }} > <h5>Drop Your File or Click Here...</h5></label></div>
         </div>)
      }

   }
   renderFileDropper = () => {
      var Markup = "";
      if (this.state.displayDropper) {
         Markup = (<div className="Dropper-Background">
            <div id="box" className="card Dropper " draggable onDragOver={this.onDragOver} onDrop={(event) => this.handleDrop(event)} style={{ opacity: this.state.opacity ? "1" : "0" }} >

               <div className="Dropper-close" onClick={this.ToggleDropper}>X</div>
               {this.displayImage()}
            </div ></div>
         )
      }

      return Markup;
   }
   ToggleDropper = () => {
      this.setState({
         displayDropper: !this.state.displayDropper
      })
      setTimeout(
         () => { this.setState({ opacity: !this.state.opacity }) }, 100)
   }
   Prompt = () => {
      if (!this.state.imageSelected)
         return (<h4>Upload A file (Click Here)</h4>)
      else
         return (<h5>File Selected : <i> {this.state.imageFile.name}</i></h5>)
   }
   render() {


      var Markup = (<div className="row">

         <label style={{ fontSize: "14px" }} className="blue-text">{this.props.title}</label>

         <div className="blue-text center scale-transition" onClick={this.ToggleDropper} style={{ cursor: "pointer", border: "2px dashed gray", borderRadius: "8px" }}>

            {this.Prompt()}

         </div>
         {this.renderFileDropper()}
      </div>)

      return Markup
   }
}