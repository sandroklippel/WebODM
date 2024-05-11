import React, { PureComponent, Fragment } from "react";

import { DropdownButton, MenuItem } from "react-bootstrap";

import IonAssetLabel from "./IonAssetLabel";
import { AssetStyles } from "../defaults";

import "./IonAssetButton.scss";

export default class IonAssetButton extends PureComponent {
	static defaultProps = {
		assets: [],
		assetComponent: IonAssetLabel,
		onSelect: () => {}
	};

	handleClick = asset => () => this.props.onSelect(asset);

	// render() {
	// 	const {
	// 		assets,
	// 		onSelect,
	// 		children,
	// 		assetComponent: AssetComponent
	// 	} = this.props;

	// 	const menuItems = assets
	// 		.sort((a, b) =>
	// 			AssetStyles[a].name.localeCompare(AssetStyles[b].name)
	// 		)
	// 		.map(asset => (
	// 			<MenuItem
	// 				key={asset}
	// 				tag={"a"}
	// 				onClick={this.handleClick(asset)}
	// 			>
	// 				<AssetComponent asset={asset} showIcon={true} />
	// 			</MenuItem>
	// 		));

	// 	const title = (
	// 		<Fragment>
	// 			<i className={"fa fa-cesium"} />
	// 			{children}
	// 		</Fragment>
	// 	);

	// 	return (
	// 		<DropdownButton
	// 			id={"cesiumIonUploadDropdown"}
	// 			bsStyle={"primary"}
	// 			bsSize={"small"}
	// 			className={"ion-btn"}
	// 			title={title}
	// 		>
	// 			{menuItems}
	// 		</DropdownButton>
	// 	);
	// }

	render() {
		const {
			assets,
			onSelect,
			children,
			assetComponent: AssetComponent
		} = this.props;
	
		const menuItems = assets
			.sort((a, b) =>
				AssetStyles[a].name.localeCompare(AssetStyles[b].name)
			)
			.map(asset => (
				<li key={asset}>
					<a style={{cursor:'pointer'}} onClick={this.handleClick(asset)}>
						<AssetComponent asset={asset} showIcon={true} />
					</a>
				</li>
			));
	
		const title = (
			<Fragment>
				<i className={"fa fa-cesium"} />
				{children}
			</Fragment>
		);
	
		return (
			<div className={"btn-group"}>
				<button type="button" className={"btn btn-sm btn-primary"} data-toggle="dropdown">
					{title}
				</button>
				<button type="button" className={"btn btn-sm dropdown-toggle btn-primary"} data-toggle="dropdown">
					<span className="caret"></span>
				</button>
				<ul className="dropdown-menu">
					{menuItems}
				</ul>
			</div>
		);
	}
}
