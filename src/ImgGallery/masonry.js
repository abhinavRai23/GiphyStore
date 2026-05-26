import React from 'react';

export class MasonryContainer extends React.Component{
	render(){
		return (
			<div className="container">
				<div className="masonry-container">
					<Masonry brakePoints={this.props.brakePoints}>
						{this.props.list.map((item) => {
							return (
								<Tile key={item.id} item={item} />
							) 
						})}
					</Masonry>
				</div>
			</div>
		)
	}
}

const Tile = ({item}) => {
  const thumbnail = item.images.fixed_width.webp
		|| item.images.downsized_medium.url
		|| item.images.original.url;
  const thumbnailWidth = item.images.fixed_width.width
		|| item.images.downsized_medium.width
		|| item.images.original.width;

  return (
    <div className="tile">
		<img
			width={thumbnailWidth}
			src={thumbnail}
			alt={item.title}
			data-preview-gif={item.images.original.url}
			data-preview-still={item.images.original_still.url}
		/>
	</div>
  );
};

class Masonry extends React.Component{
	constructor(props){
		super(props);
		this.state = {columns: 1};
		this.onResize = this.onResize.bind(this);
	}
	componentDidMount(){
		this.onResize();
		window.addEventListener('resize', this.onResize)	
	}
	
	getColumns(w){
		return this.props.brakePoints.reduceRight( (p, c, i) => {
			return c < w ? p : i;
		}, this.props.brakePoints.length) + 1;
	}
	
	onResize(){
		const columns = this.getColumns(this.refs.Masonry.offsetWidth);
		if(columns !== this.state.columns){
			this.setState({columns: columns});	
		}
		
	}
	
	mapChildren(){
		let col = [];
		const numC = this.state.columns;
		for(let i = 0; i < numC; i++){
			col.push([]);
		}
		return this.props.children.reduce((p,c,i) => {
			p[i%numC].push(c);
			return p;
		}, col);
	}
	
	render(){
		return (
			<div className="masonry" ref="Masonry">
				{this.mapChildren().map((col, ci) => {
					return (
						<div className="column" key={ci} >
							{col.map((child, i) => {
								return <div key={i} >{child}</div>
							})}
						</div>
					)
				})}
			</div>
		)
	}
}
