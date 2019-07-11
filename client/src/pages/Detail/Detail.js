import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input } from "../../components/Form";
import Select from 'react-select';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Jumbotron from "../../components/Jumbotron";
import ReactTooltip from 'react-tooltip'
import API from "../../utils/API";
import guns from "../../utils/guns";


class Detail extends Component {
	constructor() {
		super();
		this.state = {
			unit: {},
      wargearOptions: {},
      wargearOptions2: {},
			pts: 0,
			wargearPts: 0,
			wargearPts2: 0,
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
	}
  // When this component mounts, grab the unit with the _id of this.props.match.params.id
  // e.g. localhost:3000/units/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getUnit(this.props.match.params.id)
			.then(res => this.setState({ unit: res.data }))
      .catch(err => console.log(err));
  }
	
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
	};
	
	update = event => {
		event.preventDefault();
		console.log(this)
		API.updateUnit(this.props.match.params.id, {
			name: this.state.name,
			equipment: this.state.equipment,
			abilities: this.state.abilities,
			pts: this.state.pts + this.state.wargearPts + this.state.wargearPts2,
		})
		API.getUnit(this.props.match.params.id)
		.then(res => this.setState({ unit: res.data }))
		.catch(err => console.log(err));
	};

	handleChange3 = (wargearOptions) => {
		// switch (wargearOptions) {
		// 	case "none":
		// 		this.setState({equipment: "chainsword", wargearPts: 0})
		// 		console.log(this.state.equipment)
		// 		break;
		// 	default:
		// 		this.setState({equipment: "big shoota", wargearPts: 0})
		// 		console.log(this.state.equipment)
		// }
    if (wargearOptions.value === "none" && this.state.unit.unitType === "Tactical Marine Gunner") {
      this.setState({
				pts: 13,
        wargearPts: 0,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
			});
			console.log(this)
    }
    if (wargearOptions.value === "flamer" && this.state.unit.unitType === "Tactical Marine Gunner") {
      this.setState({
				pts: 13,
        wargearPts: 3,
        equipment: "flamer, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "meltagun" && this.state.unit.unitType === "Tactical Marine Gunner") {
      this.setState({
				pts: 13,
        wargearPts: 3,
        equipment: "meltagun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "plasma gun" && this.state.unit.unitType === "Tactical Marine Gunner") {
      this.setState({
				pts: 13,
        wargearPts: 3,
        equipment: "plasma gun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "grav-gun" && this.state.unit.unitType === "Tactical Marine Gunner") {
      this.setState({
				pts: 13,
        wargearPts: 2,
        equipment: "grav-gun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "missile launcher" && this.state.unit.unitType === "Tactical Marine Gunner") {
      this.setState({
				pts: 13,
        wargearPts: 5,
        equipment: "missile launcher, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "heavy bolter" && this.state.unit.unitType === "Tactical Marine Gunner") {
      this.setState({
				pts: 13,
        wargearPts: 3,
        equipment: "heavy bolter, bolt pistol, frag grenades, krak grenades"
      });
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Tactical Marine Sergeant") {
      this.setState({
				pts: 13,
        wargearPts: 0,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
      });
		}
		if (wargearOptions.value === "combi-flamer" && this.state.unit.unitType === "Tactical Marine Sergeant") {
      this.setState({
				pts: 13,
        wargearPts: 3,
        equipment: "combi-flamer, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "combi-grav" && this.state.unit.unitType === "Tactical Marine Sergeant") {
      this.setState({
				pts: 13,
        wargearPts: 2,
        equipment: "combi-grav, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "combi-melta" && this.state.unit.unitType === "Tactical Marine Sergeant") {
      this.setState({
				pts: 13,
        wargearPts: 3,
        equipment: "combi-melta, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "combi-plasma" && this.state.unit.unitType === "Tactical Marine Sergeant") {
      this.setState({
				pts: 13,
        wargearPts: 3,
        equipment: "combi-plasma, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "bolt pistol auspex" && this.state.unit.unitType === "Tactical Marine Sergeant") {
      this.setState({
				pts: 13,
        wargearPts: 1,
        equipment: "auspex, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "bolt pistol chainsword" && this.state.unit.unitType === "Tactical Marine Sergeant") {
      this.setState({
				pts: 13,
        wargearPts: 0,
        equipment: "chainsword, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "bolt pistol power fist" && this.state.unit.unitType === "Tactical Marine Sergeant") {
      this.setState({
				pts: 13,
        wargearPts: 4,
        equipment: "power fist, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "bolt pistol power sword" && this.state.unit.unitType === "Tactical Marine Sergeant") {
      this.setState({
				pts: 13,
        wargearPts: 2,
        equipment: "power sword, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "plasma pistol auspex" && this.state.unit.unitType === "Tactical Marine Sergeant") {
      this.setState({
				pts: 13,
        wargearPts: 2,
        equipment: "auspex, plasma pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "plasma pistol chainsword" && this.state.unit.unitType === "Tactical Marine Sergeant") {
      this.setState({
				pts: 13,
        wargearPts: 1,
        equipment: "chainsword, plasma pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "plasma pistol power fist" && this.state.unit.unitType === "Tactical Marine Sergeant") {
      this.setState({
				pts: 13,
        wargearPts: 5,
        equipment: "power fist, plasma pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "plasma pistol power sword" && this.state.unit.unitType === "Tactical Marine Sergeant") {
      this.setState({
				pts: 13,
        wargearPts: 3,
        equipment: "power sword, plasma pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "grav-pistol auspex" && this.state.unit.unitType === "Tactical Marine Sergeant") {
      this.setState({
				pts: 13,
        wargearPts: 2,
        equipment: "auspex, grav-pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "grav-pistol chainsword" && this.state.unit.unitType === "Tactical Marine Sergeant") {
      this.setState({
				pts: 13,
        wargearPts: 1,
        equipment: "chainsword, grav-pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "grav-pistol power fist" && this.state.unit.unitType === "Tactical Marine Sergeant") {
      this.setState({
				pts: 13,
        wargearPts: 5,
        equipment: "power fist, grav-pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "grav-pistol power sword" && this.state.unit.unitType === "Tactical Marine Sergeant") {
      this.setState({
				pts: 13,
        wargearPts: 3,
        equipment: "power sword, grav-pistol, frag grenades, krak grenades"
      });
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Scout") {
      this.setState({
				pts: 10,
        wargearPts: 0,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
      });
		}
		if (wargearOptions.value === "combat knife" && this.state.unit.unitType === "Scout") {
      this.setState({
				pts: 10,
        wargearPts: 0,
        equipment: "combat knife, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "astartes shotgun" && this.state.unit.unitType === "Scout") {
      this.setState({
				pts: 10,
        wargearPts: 0,
        equipment: "astartes shotgun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "sniper rifle camo cloak" && this.state.unit.unitType === "Scout") {
      this.setState({
				pts: 10,
        wargearPts: 2,
        equipment: "sniper rifle, camo cloak, bolt pistol, frag grenades, krak grenades"
      });
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Scout Gunner") {
      this.setState({
				pts: 11,
        wargearPts: 0,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
      });
		}
		if (wargearOptions.value === "heavy bolter" && this.state.unit.unitType === "Scout Gunner") {
      this.setState({
				pts: 11,
        wargearPts: 3,
        equipment: "heavy bolter, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "missile launcher" && this.state.unit.unitType === "Scout Gunner") {
      this.setState({
				pts: 11,
        wargearPts: 5,
        equipment: "missile launcher, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "missile launcher camo cloak" && this.state.unit.unitType === "Scout Gunner") {
      this.setState({
				pts: 11,
        wargearPts: 6,
        equipment: "missile launcher, camo cloak, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "sniper rifle camo cloak" && this.state.unit.unitType === "Scout Gunner") {
      this.setState({
				pts: 11,
        wargearPts: 2,
        equipment: "sniper rifle, camo cloak, bolt pistol, frag grenades, krak grenades"
      });
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Scout Sergeant") {
      this.setState({
				pts: 11,
        wargearPts: 0,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
      });
		}
		if (wargearOptions.value === "astartes shotgun" && this.state.unit.unitType === "Scout Sergeant") {
      this.setState({
				pts: 11,
        wargearPts: 0,
        equipment: "astartes shotgun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "chainsword" && this.state.unit.unitType === "Scout Sergeant") {
      this.setState({
				pts: 11,
        wargearPts: 0,
        equipment: "chainsword, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "sniper rifle camo cloak" && this.state.unit.unitType === "Scout Sergeant") {
      this.setState({
				pts: 11,
        wargearPts: 2,
        equipment: "sniper rifle, camo cloak, bolt pistol, frag grenades, krak grenades"
      });
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Intercessor") {
      this.setState({
				pts: 15,
        wargearPts: 0,
        equipment: "bolt rifle, bolt pistol, frag grenades, krak grenades"
      });
		}
		if (wargearOptions.value === "auto bolt rifle" && this.state.unit.unitType === "Intercessor") {
      this.setState({
				pts: 15,
        wargearPts: 0,
        equipment: "auto bolt rifle, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "stalker bolt rifle" && this.state.unit.unitType === "Intercessor") {
      this.setState({
				pts: 15,
        wargearPts: 0,
        equipment: "stalker bolt rifle, bolt pistol, frag grenades, krak grenades"
      });
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Intercessor Gunner") {
      this.setState({
				pts: 16,
        wargearPts: 0,
        equipment: "bolt rifle, bolt pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "auxiliary grenade launcher" && this.state.unit.unitType === "Intercessor Gunner") {
      this.setState({
				pts: 16,
        wargearPts: 0,
        equipment: "auxiliary grenade launcher, bolt rifle, bolt pistol, frag grenades, krak grenades"
      });
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Intercessor Sergeant") {
      this.setState({
				pts: 16,
        wargearPts: 0,
        equipment: "bolt rifle, bolt pistol, frag grenades, krak grenades"
			});
		}
    if (wargearOptions.value === "chainsword" && this.state.unit.unitType === "Intercessor Sergeant") {
      this.setState({
				pts: 16,
        wargearPts: 0,
        equipment: "chainsword, bolt rifle, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "power sword" && this.state.unit.unitType === "Intercessor Sergeant") {
      this.setState({
				pts: 16,
        wargearPts: 2,
        equipment: "power sword, bolt rifle, bolt pistol, frag grenades, krak grenades"
      });
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Reiver") {
      this.setState({
				pts: 16,
        wargearPts: 0,
        equipment: "bolt carbine, heavy bolt pistol, frag grenades, krak grenades, shock grenades"
			});
		}
    if (wargearOptions.value === "combat knife" && this.state.unit.unitType === "Reiver") {
      this.setState({
				pts: 16,
        wargearPts: 0,
        equipment: "combat knife, heavy bolt pistol, frag grenades, krak grenades, shock grenades"
      });
    }

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Reiver Sergeant") {
      this.setState({
				pts: 17,
        wargearPts: 0,
        equipment: "bolt carbine, heavy bolt pistol, frag grenades, krak grenades, shock grenades"
			});
		}
    if (wargearOptions.value === "combat knife" && this.state.unit.unitType === "Reiver Sergeant") {
      this.setState({
				pts: 17,
        wargearPts: 0,
        equipment: "combat knife, heavy bolt pistol, frag grenades, krak grenades, shock grenades"
      });
    }

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Deathwatch Veteran") {
      this.setState({
				pts: 14,
        wargearPts: 0,
        equipment: "boltgun, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "combi-melta" && this.state.unit.unitType === "Deathwatch Veteran") {
      this.setState({
				pts: 14,
        wargearPts: 3,
        equipment: "combi-melta, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "combi-plasma" && this.state.unit.unitType === "Deathwatch Veteran") {
      this.setState({
				pts: 14,
        wargearPts: 4,
        equipment: "combi-plasma, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "stalker pattern boltgun" && this.state.unit.unitType === "Deathwatch Veteran") {
      this.setState({
				pts: 14,
        wargearPts: 1,
        equipment: "stalker pattern boltgun, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "power maul" && this.state.unit.unitType === "Deathwatch Veteran") {
			this.setState({
				pts: 14,
				wargearPts: 2,
        equipment: "boltgun, power maul, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "power sword" && this.state.unit.unitType === "Deathwatch Veteran") {
			this.setState({
				pts: 14,
				wargearPts: 2,
        equipment: "boltgun, power sword, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "storm shield power maul" && this.state.unit.unitType === "Deathwatch Veteran") {
			this.setState({
				pts: 14,
				wargearPts: 5,
        equipment: "storm shield, power maul, frag grenades, krak grenades"
      });
		}
    if (wargearOptions.value === "storm shield power sword" && this.state.unit.unitType === "Deathwatch Veteran") {
			this.setState({
				pts: 14,
				wargearPts: 5,
        equipment: "storm shield, power sword, frag grenades, krak grenades"
      });
		}
		if (wargearOptions.value === "combi-melta power sword" && this.state.unit.unitType === "Deathwatch Veteran") {
			this.setState({
				pts: 14,
				wargearPts: 5,
				equipment: "combi-melta, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-plasma power sword" && this.state.unit.unitType === "Deathwatch Veteran") {
			this.setState({
				pts: 14,
				wargearPts: 6,
				equipment: "combi-plasma, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "stalker pattern boltgun power sword" && this.state.unit.unitType === "Deathwatch Veteran") {
			this.setState({
				pts: 14,
				wargearPts: 4,
				equipment: "stalker pattern boltgun, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-melta power maul" && this.state.unit.unitType === "Deathwatch Veteran") {
			this.setState({
				pts: 14,
				wargearPts: 5,
				equipment: "combi-melta, power maul, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-plasma power maul" && this.state.unit.unitType === "Deathwatch Veteran") {
			this.setState({
				pts: 14,
				wargearPts: 6,
				equipment: "combi-plasma, power maul, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "stalker pattern boltgun power maul" && this.state.unit.unitType === "Deathwatch Veteran") {
			this.setState({
				pts: 14,
				wargearPts: 4,
				equipment: "stalker pattern boltgun, power maul, frag grenades, krak grenades"
			});
		}
    if (wargearOptions.value === "deathwatch shotgun" && this.state.unit.unitType === "Deathwatch Veteran") {
			this.setState({
				pts: 14,
				wargearPts: 2,
        equipment: "deathwatch shotgun, frag grenades, krak grenades"
      });
		}
    if (wargearOptions.value === "heavy thunder hammer" && this.state.unit.unitType === "Deathwatch Veteran") {
      this.setState({
				pts: 14,
        wargearPts: 5,
        equipment: "heavy thunder hammer, frag grenades, krak grenades"
      });
		}

    if (wargearOptions.value === "none" && this.state.unit.unitType === "Deathwatch Veteran Gunner") {
      this.setState({
				pts: 16,
        wargearPts: 0,
        equipment: "boltgun, frag grenades, krak grenades"
      });
		}
		if (wargearOptions.value === "combi-melta" && this.state.unit.unitType === "Deathwatch Veteran Gunner") {
      this.setState({
				pts: 16,
        wargearPts: 3,
        equipment: "combi-melta, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "combi-plasma" && this.state.unit.unitType === "Deathwatch Veteran Gunner") {
      this.setState({
				pts: 16,
        wargearPts: 4,
        equipment: "combi-plasma, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "stalker pattern boltgun" && this.state.unit.unitType === "Deathwatch Veteran Gunner") {
      this.setState({
				pts: 16,
        wargearPts: 1,
        equipment: "stalker pattern boltgun, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "power maul" && this.state.unit.unitType === "Deathwatch Veteran Gunner") {
			this.setState({
				pts: 16,
				wargearPts: 2,
        equipment: "boltgun, power maul, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "power sword" && this.state.unit.unitType === "Deathwatch Veteran Gunner") {
			this.setState({
				pts: 16,
				wargearPts: 2,
        equipment: "boltgun, power sword, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "storm shield power maul" && this.state.unit.unitType === "Deathwatch Veteran Gunner") {
			this.setState({
				pts: 16,
				wargearPts: 5,
        equipment: "storm shield, power maul, frag grenades, krak grenades"
      });
		}
    if (wargearOptions.value === "storm shield power sword" && this.state.unit.unitType === "Deathwatch Veteran Gunner") {
			this.setState({
				pts: 16,
				wargearPts: 5,
        equipment: "storm shield, power sword, frag grenades, krak grenades"
      });
		}
		if (wargearOptions.value === "combi-melta power sword" && this.state.unit.unitType === "Deathwatch Veteran Gunner") {
			this.setState({
				pts: 16,
				wargearPts: 5,
				equipment: "combi-melta, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-plasma power sword" && this.state.unit.unitType === "Deathwatch Veteran Gunner") {
			this.setState({
				pts: 16,
				wargearPts: 6,
				equipment: "combi-plasma, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "stalker pattern boltgun power sword" && this.state.unit.unitType === "Deathwatch Veteran Gunner") {
			this.setState({
				pts: 16,
				wargearPts: 4,
				equipment: "stalker pattern boltgun, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-melta power maul" && this.state.unit.unitType === "Deathwatch Veteran Gunner") {
			this.setState({
				pts: 16,
				wargearPts: 5,
				equipment: "combi-melta, power maul, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-plasma power maul" && this.state.unit.unitType === "Deathwatch Veteran Gunner") {
			this.setState({
				pts: 16,
				wargearPts: 6,
				equipment: "combi-plasma, power maul, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "stalker pattern boltgun power maul" && this.state.unit.unitType === "Deathwatch Veteran Gunner") {
			this.setState({
				pts: 16,
				wargearPts: 4,
				equipment: "stalker pattern boltgun, power maul, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "deathwatch frag cannon" && this.state.unit.unitType === "Deathwatch Veteran Gunner") {
			this.setState({
				pts: 16,
				wargearPts: 5,
				equipment: "deathwatch frag cannon, frag grenades, krak grenades"
			});
		}
    if (wargearOptions.value === "infernus heavy bolter" && this.state.unit.unitType === "Deathwatch Veteran Gunner") {
			this.setState({
				pts: 16,
				wargearPts: 2,
        equipment: "infernus heavy bolter, frag grenades, krak grenades"
      });
		}

    if (wargearOptions.value === "none" && this.state.unit.unitType === "Black Shield") {
      this.setState({
				pts: 16,
        wargearPts: 0,
        equipment: "boltgun, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "combi-melta" && this.state.unit.unitType === "Black Shield") {
      this.setState({
				pts: 16,
        wargearPts: 3,
        equipment: "combi-melta, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "combi-plasma" && this.state.unit.unitType === "Black Shield") {
      this.setState({
				pts: 16,
        wargearPts: 4,
        equipment: "combi-plasma, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "stalker pattern boltgun" && this.state.unit.unitType === "Black Shield") {
      this.setState({
				pts: 16,
        wargearPts: 1,
        equipment: "stalker pattern boltgun, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "power maul" && this.state.unit.unitType === "Black Shield") {
			this.setState({
				pts: 16,
				wargearPts: 2,
        equipment: "boltgun, power maul, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "power sword" && this.state.unit.unitType === "Black Shield") {
			this.setState({
				pts: 16,
				wargearPts: 2,
        equipment: "boltgun, power sword, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "storm shield power maul" && this.state.unit.unitType === "Black Shield") {
			this.setState({
				pts: 16,
				wargearPts: 5,
        equipment: "storm shield, power maul, frag grenades, krak grenades"
      });
		}
    if (wargearOptions.value === "storm shield power sword" && this.state.unit.unitType === "Black Shield") {
			this.setState({
				pts: 16,
				wargearPts: 5,
        equipment: "storm shield, power sword, frag grenades, krak grenades"
      });
		}
		if (wargearOptions.value === "combi-melta power sword" && this.state.unit.unitType === "Black Shield") {
			this.setState({
				pts: 16,
				wargearPts: 5,
				equipment: "combi-melta, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-plasma power sword" && this.state.unit.unitType === "Black Shield") {
			this.setState({
				pts: 16,
				wargearPts: 6,
				equipment: "combi-plasma, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "stalker pattern boltgun power sword" && this.state.unit.unitType === "Black Shield") {
			this.setState({
				pts: 16,
				wargearPts: 4,
				equipment: "stalker pattern boltgun, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-melta power maul" && this.state.unit.unitType === "Black Shield") {
			this.setState({
				pts: 16,
				wargearPts: 5,
				equipment: "combi-melta, power maul, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-plasma power maul" && this.state.unit.unitType === "Black Shield") {
			this.setState({
				pts: 16,
				wargearPts: 6,
				equipment: "combi-plasma, power maul, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "stalker pattern boltgun power maul" && this.state.unit.unitType === "Black Shield") {
			this.setState({
				pts: 16,
				wargearPts: 4,
				equipment: "stalker pattern boltgun, power maul, frag grenades, krak grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Watch Sergeant") {
			this.setState({
				pts: 16,
				wargearPts: 0,
				equipment: "boltgun, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-melta" && this.state.unit.unitType === "Watch Sergeant") {
      this.setState({
				pts: 16,
        wargearPts: 3,
        equipment: "combi-melta, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "combi-plasma" && this.state.unit.unitType === "Watch Sergeant") {
      this.setState({
				pts: 16,
        wargearPts: 4,
        equipment: "combi-plasma, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "stalker pattern boltgun" && this.state.unit.unitType === "Watch Sergeant") {
      this.setState({
				pts: 16,
        wargearPts: 1,
        equipment: "stalker pattern boltgun, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "power maul" && this.state.unit.unitType === "Watch Sergeant") {
			this.setState({
				pts: 16,
				wargearPts: 2,
        equipment: "boltgun, power maul, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "power sword" && this.state.unit.unitType === "Watch Sergeant") {
			this.setState({
				pts: 16,
				wargearPts: 2,
        equipment: "boltgun, power sword, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "storm shield power maul" && this.state.unit.unitType === "Watch Sergeant") {
			this.setState({
				pts: 16,
				wargearPts: 5,
        equipment: "storm shield, power maul, frag grenades, krak grenades"
      });
		}
    if (wargearOptions.value === "storm shield power sword" && this.state.unit.unitType === "Watch Sergeant") {
			this.setState({
				pts: 16,
				wargearPts: 5,
        equipment: "storm shield, power sword, frag grenades, krak grenades"
      });
		}
		if (wargearOptions.value === "combi-melta power sword" && this.state.unit.unitType === "Watch Sergeant") {
			this.setState({
				pts: 16,
				wargearPts: 5,
				equipment: "combi-melta, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-plasma power sword" && this.state.unit.unitType === "Watch Sergeant") {
			this.setState({
				pts: 16,
				wargearPts: 6,
				equipment: "combi-plasma, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "stalker pattern boltgun power sword" && this.state.unit.unitType === "Watch Sergeant") {
			this.setState({
				pts: 16,
				wargearPts: 4,
				equipment: "stalker pattern boltgun, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-melta power maul" && this.state.unit.unitType === "Watch Sergeant") {
			this.setState({
				pts: 16,
				wargearPts: 5,
				equipment: "combi-melta, power maul, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-plasma power maul" && this.state.unit.unitType === "Watch Sergeant") {
			this.setState({
				pts: 16,
				wargearPts: 6,
				equipment: "combi-plasma, power maul, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "stalker pattern boltgun power maul" && this.state.unit.unitType === "Watch Sergeant") {
			this.setState({
				pts: 16,
				wargearPts: 4,
				equipment: "stalker pattern boltgun, power maul, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "xenophase blade" && this.state.unit.unitType === "Watch Sergeant") {
			this.setState({
				pts: 16,
				wargearPts: 3,
				equipment: "xenophase blade, boltgun, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "storm shield xenophase blade" && this.state.unit.unitType === "Watch Sergeant") {
			this.setState({
				pts: 16,
				wargearPts: 6,
				equipment: "storm shield, xenophase blade, boltgun, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-melta xenophase blade" && this.state.unit.unitType === "Watch Sergeant") {
			this.setState({
				pts: 16,
				wargearPts: 6,
				equipment: "combi-melta, xenophase blade, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-plasma xenophase blade" && this.state.unit.unitType === "Watch Sergeant") {
			this.setState({
				pts: 16,
				wargearPts: 7,
				equipment: "combi-plasma, xenophase blade, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "stalker pattern boltgun xenophase blade" && this.state.unit.unitType === "Watch Sergeant") {
			this.setState({
				pts: 16,
				wargearPts: 4,
				equipment: "stalker pattern boltgun, xenophase blade, frag grenades, krak grenades"
			});
		}

    if (wargearOptions.value === "none" && this.state.unit.unitType === "Grey Knight") {
      this.setState({
				pts: 18,
        wargearPts: 0,
        equipment: "nemesis force sword, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      });
    }
    if (wargearOptions.value === "nemesis force halberd" && this.state.unit.unitType === "Grey Knight") {
			this.setState({
				pts: 18,
				wargearPts: 0,
        equipment: "nemesis force halberd, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      });
    }
    if (wargearOptions.value === "nemesis daemon hammer" && this.state.unit.unitType === "Grey Knight") {
			this.setState({
				pts: 18,
				wargearPts: 2,
        equipment: "nemesis daemon hammer, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      });
    }
    if (wargearOptions.value === "nemesis warding stave" && this.state.unit.unitType === "Grey Knight") {
			this.setState({
				pts: 18,
				wargearPts: 0,
        equipment: "nemesis warding stave, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      });
    }
    if (wargearOptions.value === "two nemesis falchions" && this.state.unit.unitType === "Grey Knight") {
			this.setState({
				pts: 18,
				wargearPts: 1,
        equipment: "two nemesis falchions, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      });
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Justicar") {
			this.setState({
				pts: 19,
				wargearPts: 0,
				equipment: "nemesis force sword, storm bolter, frag grenades, krak grenades, psyk-out grenades"
			});
		}
    if (wargearOptions.value === "nemesis force halberd" && this.state.unit.unitType === "Justicar") {
      this.setState({
				pts: 19,
        wargearPts: 0,
        equipment: "nemesis force halberd, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      });
    }
    if (wargearOptions.value === "nemesis daemon hammer" && this.state.unit.unitType === "Justicar") {
      this.setState({
				pts: 19,
        wargearPts: 2,
        equipment: "nemesis daemon hammer, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      });
    }
    if (wargearOptions.value === "nemesis warding stave" && this.state.unit.unitType === "Justicar") {
      this.setState({
				pts: 19,
        wargearPts: 0,
        equipment: "nemesis warding stave, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      });
    }
    if (wargearOptions.value === "two nemesis falchions" && this.state.unit.unitType === "Justicar") {
      this.setState({
				pts: 19,
        wargearPts: 1,
        equipment: "two nemesis falchions, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      });
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Grey Knight Gunner") {
      this.setState({
				pts: 19,
        wargearPts: 0,
        equipment: "nemesis force sword, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      });
    }
		if (wargearOptions.value === "incinerator" && this.state.unit.unitType === "Grey Knight Gunner") {
      this.setState({
				pts: 19,
        wargearPts: 3,
        equipment: "incinerator, frag grenades, krak grenades, psyk-out grenades"
      });
    }
		if (wargearOptions.value === "psilencer" && this.state.unit.unitType === "Grey Knight Gunner") {
      this.setState({
				pts: 19,
        wargearPts: 3,
        equipment: "psilencer, frag grenades, krak grenades, psyk-out grenades"
      });
    }
		if (wargearOptions.value === "psycannon" && this.state.unit.unitType === "Grey Knight Gunner") {
      this.setState({
				pts: 19,
        wargearPts: 2,
        equipment: "psycannon, frag grenades, krak grenades, psyk-out grenades"
      });
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Guardsman Gunner") {
      this.setState({
				pts: 5,
        wargearPts: 0,
        equipment: "lasgun, frag grenades"
      });
    }
		if (wargearOptions.value === "flamer" && this.state.unit.unitType === "Guardsman Gunner") {
      this.setState({
				pts: 5,
        wargearPts: 3,
        equipment: "flamer, frag grenades"
      });
    }
		if (wargearOptions.value === "grenade launcher" && this.state.unit.unitType === "Guardsman Gunner") {
      this.setState({
				pts: 5,
        wargearPts: 2,
        equipment: "grenade launcher, frag grenades"
      });
    }
		if (wargearOptions.value === "meltagun" && this.state.unit.unitType === "Guardsman Gunner") {
      this.setState({
				pts: 5,
        wargearPts: 3,
        equipment: "meltagun, frag grenades"
      });
    }
		if (wargearOptions.value === "plasma gun" && this.state.unit.unitType === "Guardsman Gunner") {
      this.setState({
				pts: 5,
        wargearPts: 3,
        equipment: "plasma gun, frag grenades"
      });
    }
		if (wargearOptions.value === "sniper rifle" && this.state.unit.unitType === "Guardsman Gunner") {
      this.setState({
				pts: 5,
        wargearPts: 1,
        equipment: "sniper rifle, frag grenades"
      });
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Sergeant") {
      this.setState({
				pts: 5,
        wargearPts: 0,
        equipment: "laspistol, chainsword, frag grenades"
      });
    }
		if (wargearOptions.value === "bolt pistol" && this.state.unit.unitType === "Sergeant") {
      this.setState({
				pts: 5,
        wargearPts: 0,
        equipment: "bolt pistol, chainsword, frag grenades"
      });
    }
		if (wargearOptions.value === "power sword" && this.state.unit.unitType === "Sergeant") {
      this.setState({
				pts: 5,
        wargearPts: 1,
        equipment: "laspistol, power sword, frag grenades"
      });
    }
		if (wargearOptions.value === "plasma pistol" && this.state.unit.unitType === "Sergeant") {
      this.setState({
				pts: 5,
        wargearPts: 1,
        equipment: "plasma pistol, chainsword, frag grenades"
      });
    }
		if (wargearOptions.value === "bolt pistol power sword" && this.state.unit.unitType === "Sergeant") {
      this.setState({
				pts: 5,
        wargearPts: 1,
        equipment: "bolt pistol, power sword, frag grenades"
      });
    }
		if (wargearOptions.value === "plasma pistol power sword" && this.state.unit.unitType === "Sergeant") {
      this.setState({
				pts: 5,
        wargearPts: 2,
        equipment: "plasma pistol, power sword, frag grenades"
      });
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Special Weapons Gunner") {
      this.setState({
				pts: 5,
        wargearPts: 0,
        equipment: "lasgun, frag grenades"
      });
    }
		if (wargearOptions.value === "flamer" && this.state.unit.unitType === "Special Weapons Gunner") {
      this.setState({
				pts: 5,
        wargearPts: 3,
        equipment: "flamer, frag grenades"
      });
    }
		if (wargearOptions.value === "grenade launcher" && this.state.unit.unitType === "Special Weapons Gunner") {
      this.setState({
				pts: 5,
        wargearPts: 2,
        equipment: "grenade launcher, frag grenades"
      });
    }
		if (wargearOptions.value === "meltagun" && this.state.unit.unitType === "Special Weapons Gunner") {
      this.setState({
				pts: 5,
        wargearPts: 3,
        equipment: "meltagun, frag grenades"
      });
    }
		if (wargearOptions.value === "plasma gun" && this.state.unit.unitType === "Special Weapons Gunner") {
      this.setState({
				pts: 5,
        wargearPts: 3,
        equipment: "plasma gun, frag grenades"
      });
    }
		if (wargearOptions.value === "sniper rifle" && this.state.unit.unitType === "Special Weapons Gunner") {
      this.setState({
				pts: 5,
        wargearPts: 1,
        equipment: "sniper rifle, frag grenades"
      });
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Scion Gunner") {
      this.setState({
				pts: 10,
        wargearPts: 0,
        equipment: "hot-shot lasgun, frag grenades, krak grenades"
      });
    }
		if (wargearOptions.value === "flamer" && this.state.unit.unitType === "Scion Gunner") {
      this.setState({
				pts: 10,
        wargearPts: 3,
        equipment: "flamer, frag grenades, krak grenades"
      });
    }
		if (wargearOptions.value === "meltagun" && this.state.unit.unitType === "Scion Gunner") {
			this.setState({
				pts: 10,
				wargearPts: 3,
        equipment: "meltagun, frag grenades, krak grenades"
      });
    }
		if (wargearOptions.value === "plasma gun" && this.state.unit.unitType === "Scion Gunner") {
			this.setState({
				pts: 10,
				wargearPts: 3,
        equipment: "plasma gun, frag grenades, krak grenades"
      });
    }
		if (wargearOptions.value === "hot-shot volley gun" && this.state.unit.unitType === "Scion Gunner") {
			this.setState({
				pts: 10,
				wargearPts: 3,
				equipment: "hot-shot volley gun, frag grenades, krak grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Tempestor") {
      this.setState({
				pts: 10,
        wargearPts: 0,
        equipment: "hot-shot laspistol, chainsword, chainsword, frag grenades, krak grenades"
      });
    }
		if (wargearOptions.value === "bolt pistol" && this.state.unit.unitType === "Tempestor") {
      this.setState({
				pts: 10,
        wargearPts: 0,
        equipment: "bolt pistol, chainsword, frag grenades, krak grenades"
      });
    }
		if (wargearOptions.value === "plasma pistol" && this.state.unit.unitType === "Tempestor") {
			this.setState({
				pts: 10,
				wargearPts: 1,
        equipment: "plasma pistol, chainsword, frag grenades, krak grenades"
      });
    }
		if (wargearOptions.value === "power sword" && this.state.unit.unitType === "Tempestor") {
			this.setState({
				pts: 10,
				wargearPts: 1,
        equipment: "hot-shot laspistol, power sword, frag grenades, krak grenades"
      });
    }
		if (wargearOptions.value === "power fist" && this.state.unit.unitType === "Tempestor") {
			this.setState({
				pts: 10,
				wargearPts: 2,
        equipment: "hot-shot laspistol, power fist, frag grenades, krak grenades"
      });
    }
		if (wargearOptions.value === "bolt pistol power sword" && this.state.unit.unitType === "Tempestor") {
			this.setState({
				pts: 10,
				wargearPts: 1,
				equipment: "bolt pistol, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plasma pistol power sword" && this.state.unit.unitType === "Tempestor") {
			this.setState({
				pts: 10,
				wargearPts: 2,
				equipment: "plasma pistol, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plasma pistol power fist" && this.state.unit.unitType === "Tempestor") {
			this.setState({
				pts: 10,
				wargearPts: 3,
				equipment: "plasma pistol, power fist, frag grenades, krak grenades"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Ranger Gunner") {
			this.setState({
				pts: 10,
				wargearPts: 0,
				equipment: "galvanic rifle"
			});
		}
		if (wargearOptions.value === "arc rifle" && this.state.unit.unitType === "Ranger Gunner") {
			this.setState({
				pts: 10,
				wargearPts: 0,
				equipment: "arc rifle"
			});
		}
		if (wargearOptions.value === "plasma caliver" && this.state.unit.unitType === "Ranger Gunner") {
			this.setState({
				pts: 10,
				wargearPts: 3,
				equipment: "plasma caliver"
			});
		}
		if (wargearOptions.value === "transuranic arquebus" && this.state.unit.unitType === "Ranger Gunner") {
			this.setState({
				pts: 10,
				wargearPts: 5,
				equipment: "transuranic arquebus"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Ranger Alpha") {
			this.setState({
				pts: 10,
				wargearPts: 0,
				equipment: "galvanic rifle"
			});
		}
		if (wargearOptions.value === "arc pistol arc maul" && this.state.unit.unitType === "Ranger Alpha") {
			this.setState({
				pts: 10,
				wargearPts: 0,
				equipment: "arc pistol, arc maul"
			});
		}
		if (wargearOptions.value === "arc pistol power sword" && this.state.unit.unitType === "Ranger Alpha") {
			this.setState({
				pts: 10,
				wargearPts: 0,
				equipment: "arc pistol, power sword"
			});
		}
		if (wargearOptions.value === "arc pistol taser goad" && this.state.unit.unitType === "Ranger Alpha") {
			this.setState({
				pts: 10,
				wargearPts: 1,
				equipment: "arc pistol, taser goad"
			});
		}
		if (wargearOptions.value === "radium pistol arc maul" && this.state.unit.unitType === "Ranger Alpha") {
			this.setState({
				pts: 10,
				wargearPts: 0,
				equipment: "radium pistol, arc maul"
			});
		}
		if (wargearOptions.value === "radium pistol power sword" && this.state.unit.unitType === "Ranger Alpha") {
			this.setState({
				pts: 10,
				wargearPts: 0,
				equipment: "radium pistol, power sword"
			});
		}
		if (wargearOptions.value === "radium pistol taser goad" && this.state.unit.unitType === "Ranger Alpha") {
			this.setState({
				pts: 10,
				wargearPts: 1,
				equipment: "radium pistol, taser goad"
			});
		}
		if (wargearOptions.value === "phosphor blast pistol arc maul" && this.state.unit.unitType === "Ranger Alpha") {
			this.setState({
				pts: 10,
				wargearPts: 0,
				equipment: "phosphor blast pistol, arc maul"
			});
		}
		if (wargearOptions.value === "phosphor blast pistol power sword" && this.state.unit.unitType === "Ranger Alpha") {
			this.setState({
				pts: 10,
				wargearPts: 0,
				equipment: "phosphor blast pistol, power sword"
			});
		}
		if (wargearOptions.value === "phosphor blast pistol taser goad" && this.state.unit.unitType === "Ranger Alpha") {
			this.setState({
				pts: 10,
				wargearPts: 1,
				equipment: "phosphor blast pistol, taser goad"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Vanguard Gunner") {
			this.setState({
				pts: 10,
				wargearPts: 0,
				equipment: "radium carbine"
			});
		}
		if (wargearOptions.value === "arc rifle" && this.state.unit.unitType === "Vanguard Gunner") {
			this.setState({
				pts: 10,
				wargearPts: 0,
				equipment: "arc rifle"
			});
		}
		if (wargearOptions.value === "plasma caliver" && this.state.unit.unitType === "Vanguard Gunner") {
			this.setState({
				pts: 10,
				wargearPts: 3,
				equipment: "plasma caliver"
			});
		}
		if (wargearOptions.value === "transuranic arquebus" && this.state.unit.unitType === "Vanguard Gunner") {
			this.setState({
				pts: 10,
				wargearPts: 5,
				equipment: "transuranic arquebus"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Vanguard Alpha") {
			this.setState({
				pts: 10,
				wargearPts: 0,
				equipment: "radium carbine"
			});
		}
		if (wargearOptions.value === "arc pistol arc maul" && this.state.unit.unitType === "Vanguard Alpha") {
			this.setState({
				pts: 10,
				wargearPts: 0,
				equipment: "arc pistol, arc maul"
			});
		}
		if (wargearOptions.value === "arc pistol power sword" && this.state.unit.unitType === "Vanguard Alpha") {
			this.setState({
				pts: 10,
				wargearPts: 0,
				equipment: "arc pistol, power sword"
			});
		}
		if (wargearOptions.value === "arc pistol taser goad" && this.state.unit.unitType === "Vanguard Alpha") {
			this.setState({
				pts: 10,
				wargearPts: 1,
				equipment: "arc pistol, taser goad"
			});
		}
		if (wargearOptions.value === "radium pistol arc maul" && this.state.unit.unitType === "Vanguard Alpha") {
			this.setState({
				pts: 10,
				wargearPts: 0,
				equipment: "radium pistol, arc maul"
			});
		}
		if (wargearOptions.value === "radium pistol power sword" && this.state.unit.unitType === "Vanguard Alpha") {
			this.setState({
				pts: 10,
				wargearPts: 0,
				equipment: "radium pistol, power sword"
			});
		}
		if (wargearOptions.value === "radium pistol taser goad" && this.state.unit.unitType === "Vanguard Alpha") {
			this.setState({
				pts: 10,
				wargearPts: 1,
				equipment: "radium pistol, taser goad"
			});
		}
		if (wargearOptions.value === "phosphor blast pistol arc maul" && this.state.unit.unitType === "Vanguard Alpha") {
			this.setState({
				pts: 10,
				wargearPts: 0,
				equipment: "phosphor blast pistol, arc maul"
			});
		}
		if (wargearOptions.value === "phosphor blast pistol power sword" && this.state.unit.unitType === "Vanguard Alpha") {
			this.setState({
				pts: 10,
				wargearPts: 0,
				equipment: "phosphor blast pistol, power sword"
			});
		}
		if (wargearOptions.value === "phosphor blast pistol taser goad" && this.state.unit.unitType === "Vanguard Alpha") {
			this.setState({
				pts: 10,
				wargearPts: 1,
				equipment: "phosphor blast pistol, taser goad"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Sicarian Ruststalker") {
			this.setState({
				pts: 14,
				wargearPts: 0,
				equipment: "transonic razor, chordclaw"
			});
		}
		if (wargearOptions.value === "transonic blades" && this.state.unit.unitType === "Sicarian Ruststalker") {
			this.setState({
				pts: 14,
				wargearPts: 0,
				equipment: "transonic blades"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Ruststalker Princeps") {
			this.setState({
				pts: 15,
				wargearPts: 0,
				equipment: "transonic razor, chordclaw"
			});
		}
		if (wargearOptions.value === "transonic blades" && this.state.unit.unitType === "Ruststalker Princeps") {
			this.setState({
				pts: 15,
				wargearPts: 0,
				equipment: "transonic blades, chordclaw"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Sicarian Infiltrator") {
			this.setState({
				pts: 14,
				wargearPts: 0,
				equipment: "stub carbine, power sword"
			});
		}
		if (wargearOptions.value === "flechette blaster taser goad" && this.state.unit.unitType === "Sicarian Infiltrator") {
			this.setState({
				pts: 14,
				wargearPts: 1,
				equipment: "flechette blaster, taser goad"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Infiltrator Princeps") {
			this.setState({
				pts: 15,
				wargearPts: 0,
				equipment: "stub carbine, power sword"
			});
		}
		if (wargearOptions.value === "flechette blaster taser goad" && this.state.unit.unitType === "Infiltrator Princeps") {
			this.setState({
				pts: 15,
				wargearPts: 1,
				equipment: "flechette blaster, taser goad"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Chaos Cultist") {
			this.setState({
				pts: 4,
				wargearPts: 0,
				equipment: "autogun"
			});
		}
		if (wargearOptions.value === "brutal assault weapon autopistol" && this.state.unit.unitType === "Chaos Cultist") {
			this.setState({
				pts: 4,
				wargearPts: 0,
				equipment: "brutal assault weapon, autopistol"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Chaos Cultist Gunner") {
			this.setState({
				pts: 5,
				wargearPts: 0,
				equipment: "autogun"
			});
		}
		if (wargearOptions.value === "flamer" && this.state.unit.unitType === "Chaos Cultist Gunner") {
			this.setState({
				pts: 5,
				wargearPts: 3,
				equipment: "flamer"
			});
		}
		if (wargearOptions.value === "heavy stubber" && this.state.unit.unitType === "Chaos Cultist Gunner") {
			this.setState({
				pts: 5,
				wargearPts: 0,
				equipment: "heavy stubber"
			});
		}
		
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Cultist Champion") {
			this.setState({
				pts: 5,
				wargearPts: 0,
				equipment: "autogun"
			});
		}
		if (wargearOptions.value === "shotgun" && this.state.unit.unitType === "Cultist Champion") {
			this.setState({
				pts: 5,
				wargearPts: 0,
				equipment: "shotgun"
			});
		}
		if (wargearOptions.value === "brutal assault weapon autopistol" && this.state.unit.unitType === "Cultist Champion") {
			this.setState({
				pts: 5,
				wargearPts: 0,
				equipment: "brutal assault weapon, autopistol"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Chaos Space Marine") {
			this.setState({
				pts: 12,
				wargearPts: 0,
				equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "chainsword" && this.state.unit.unitType === "Chaos Space Marine") {
			this.setState({
				pts: 12,
				wargearPts: 0,
				equipment: "chainsword, bolt pistol, frag grenades, krak grenades"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Chaos Space Marine Gunner") {
			this.setState({
				pts: 13,
				wargearPts: 0,
				equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "flamer" && this.state.unit.unitType === "Chaos Space Marine Gunner") {
			this.setState({
				pts: 13,
				wargearPts: 3,
				equipment: "flamer, bolt pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "meltagun" && this.state.unit.unitType === "Chaos Space Marine Gunner") {
			this.setState({
				pts: 13,
				wargearPts: 3,
				equipment: "meltagun, bolt pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plasma gun" && this.state.unit.unitType === "Chaos Space Marine Gunner") {
			this.setState({
				pts: 13,
				wargearPts: 3,
				equipment: "plasma gun, bolt pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "heavy bolter" && this.state.unit.unitType === "Chaos Space Marine Gunner") {
			this.setState({
				pts: 13,
				wargearPts: 3,
				equipment: "heavy bolter, bolt pistol, frag grenades, krak grenades"
			});
		}		

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Aspiring Champion") {
			this.setState({
				pts: 13,
				wargearPts: 0,
				equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "bolt pistol chainsword" && this.state.unit.unitType === "Aspiring Champion") {
			this.setState({
				pts: 13,
				wargearPts: 0,
				equipment: "chainsword, bolt pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "bolt pistol power fist" && this.state.unit.unitType === "Aspiring Champion") {
			this.setState({
				pts: 13,
				wargearPts: 4,
				equipment: "power fist, bolt pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "bolt pistol power sword" && this.state.unit.unitType === "Aspiring Champion") {
			this.setState({
				pts: 13,
				wargearPts: 2,
				equipment: "power sword, bolt pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plasma pistol chainsword" && this.state.unit.unitType === "Aspiring Champion") {
			this.setState({
				pts: 13,
				wargearPts: 1,
				equipment: "chainsword, plasma pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plasma pistol power fist" && this.state.unit.unitType === "Aspiring Champion") {
			this.setState({
				pts: 13,
				wargearPts: 5,
				equipment: "power fist, plasma pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plasma pistol power sword" && this.state.unit.unitType === "Aspiring Champion") {
			this.setState({
				pts: 13,
				wargearPts: 3,
				equipment: "power sword, plasma pistol, frag grenades, krak grenades"
			});
		}
				
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Plague Marine Gunner") {
			this.setState({
				pts: 15,
				wargearPts: 0,
				equipment: "boltgun, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "blight launcher" && this.state.unit.unitType === "Plague Marine Gunner") {
			this.setState({
				pts: 15,
				wargearPts: 3,
				equipment: "blight launcher, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "meltagun" && this.state.unit.unitType === "Plague Marine Gunner") {
			this.setState({
				pts: 15,
				wargearPts: 3,
				equipment: "meltagun, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plasma gun" && this.state.unit.unitType === "Plague Marine Gunner") {
			this.setState({
				pts: 15,
				wargearPts: 3,
				equipment: "plasma gun, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plague belcher" && this.state.unit.unitType === "Plague Marine Gunner") {
			this.setState({
				pts: 15,
				wargearPts: 3,
				equipment: "plague belcher, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plague spewer" && this.state.unit.unitType === "Plague Marine Gunner") {
			this.setState({
				pts: 15,
				wargearPts: 4,
				equipment: "plague spewer, plague knife, blight grenades, krak grenades"
			});
		}		
				
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Plague Marine Fighter") {
			this.setState({
				pts: 15,
				wargearPts: 0,
				equipment: "boltgun, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "bubotic axe" && this.state.unit.unitType === "Plague Marine Fighter") {
			this.setState({
				pts: 15,
				wargearPts: 2,
				equipment: "bubotic axe, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "great plague cleaver" && this.state.unit.unitType === "Plague Marine Fighter") {
			this.setState({
				pts: 15,
				wargearPts: 4,
				equipment: "great plague cleaver, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "flail of corruption" && this.state.unit.unitType === "Plague Marine Fighter") {
			this.setState({
				pts: 15,
				wargearPts: 4,
				equipment: "flail of corruption, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "second plague knife" && this.state.unit.unitType === "Plague Marine Fighter") {
			this.setState({
				pts: 15,
				wargearPts: 0,
				equipment: "plague knife, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "mace of contagion bubotic axe" && this.state.unit.unitType === "Plague Marine Fighter") {
			this.setState({
				pts: 15,
				wargearPts: 5,
				equipment: "mace of contagion, bubotic axe, plague knife, blight grenades, krak grenades"
			});
		}		
				
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Plague Champion") {
			this.setState({
				pts: 15,
				wargearPts: 0,
				equipment: "boltgun, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plaguesword" && this.state.unit.unitType === "Plague Champion") {
			this.setState({
				pts: 15,
				wargearPts: 0,
				equipment: "plaguesword, boltgun, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "bolt pistol" && this.state.unit.unitType === "Plague Champion") {
			this.setState({
				pts: 15,
				wargearPts: 0,
				equipment: "bolt pistol, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plasma pistol" && this.state.unit.unitType === "Plague Champion") {
			this.setState({
				pts: 15,
				wargearPts: 1,
				equipment: "plasma pistol, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plasma gun" && this.state.unit.unitType === "Plague Champion") {
			this.setState({
				pts: 15,
				wargearPts: 3,
				equipment: "plasma gun, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "power fist" && this.state.unit.unitType === "Plague Champion") {
			this.setState({
				pts: 15,
				wargearPts: 4,
				equipment: "boltgun, power fist, blight grenades, krak grenades"
			});
		}		
		if (wargearOptions.value === "plaguesword bolt pistol" && this.state.unit.unitType === "Plague Champion") {
			this.setState({
				pts: 15,
				wargearPts: 0,
				equipment: "plaguesword, bolt pistol, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plaguesword plasma pistol" && this.state.unit.unitType === "Plague Champion") {
			this.setState({
				pts: 15,
				wargearPts: 1,
				equipment: "plaguesword, plasma pistol, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plaguesword plasma gun" && this.state.unit.unitType === "Plague Champion") {
			this.setState({
				pts: 15,
				wargearPts: 3,
				equipment: "plaguesword, plasma gun, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "power fist bolt pistol" && this.state.unit.unitType === "Plague Champion") {
			this.setState({
				pts: 15,
				wargearPts: 4,
				equipment: "power fist, bolt pistol, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "power fist plasma pistol" && this.state.unit.unitType === "Plague Champion") {
			this.setState({
				pts: 15,
				wargearPts: 5,
				equipment: "power fist, plasma pistol, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "power fist plasma gun" && this.state.unit.unitType === "Plague Champion") {
			this.setState({
				pts: 15,
				wargearPts: 7,
				equipment: "power fist, plasma gun, blight grenades, krak grenades"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Rubric Marine") {
			this.setState({
				pts: 16,
				wargearPts: 0,
				equipment: "inferno boltgun"
			});
		}
		if (wargearOptions.value === "warpflamer" && this.state.unit.unitType === "Rubric Marine") {
			this.setState({
				pts: 16,
				wargearPts: 4,
				equipment: "warpflamer"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Rubric Marine Gunner") {
			this.setState({
				pts: 16,
				wargearPts: 0,
				equipment: "inferno boltgun"
			});
		}
		if (wargearOptions.value === "soulreaper cannon" && this.state.unit.unitType === "Rubric Marine Gunner") {
			this.setState({
				pts: 16,
				wargearPts: 4,
				equipment: "soulreaper cannon"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Aspiring Sorcerer") {
			this.setState({
				pts: 17,
				wargearPts: 0,
				equipment: "force stave, inferno bolt pistol"
			});
		}
		if (wargearOptions.value === "warpflame pistol" && this.state.unit.unitType === "Aspiring Sorcerer") {
			this.setState({
				pts: 17,
				wargearPts: 1,
				equipment: "force stave, warpflame pistol"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Tzaangor") {
			this.setState({
				pts: 7,
				wargearPts: 0,
				equipment: "tzaangor blades"
			});
		}
		if (wargearOptions.value === "autopistol chainsword" && this.state.unit.unitType === "Tzaangor") {
			this.setState({
				pts: 7,
				wargearPts: 0,
				equipment: "autopistol, chainsword"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Heavy Weapon Platform") {
			this.setState({
				pts: 8,
				wargearPts: 0,
				equipment: "shuriken cannon"
			});
		}
		if (wargearOptions.value === "aeldari missile launcher" && this.state.unit.unitType === "Heavy Weapon Platform") {
			this.setState({
				pts: 8,
				wargearPts: 5,
				equipment: "aeldari missile launcher"
			});
		}
		if (wargearOptions.value === "bright lance" && this.state.unit.unitType === "Heavy Weapon Platform") {
			this.setState({
				pts: 8,
				wargearPts: 4,
				equipment: "bright lance"
			});
		}
		if (wargearOptions.value === "scatter laser" && this.state.unit.unitType === "Heavy Weapon Platform") {
			this.setState({
				pts: 8,
				wargearPts: 2,
				equipment: "scatter laser"
			});
		}
		if (wargearOptions.value === "starcannon" && this.state.unit.unitType === "Heavy Weapon Platform") {
			this.setState({
				pts: 8,
				wargearPts: 3,
				equipment: "starcannon"
			});
		}
				
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Storm Guardian") {
			this.setState({
				pts: 6,
				wargearPts: 0,
				equipment: "shuriken pistol, aeldari blade, plasma grenades"
			});
		}
		if (wargearOptions.value === "chainsword" && this.state.unit.unitType === "Storm Guardian") {
			this.setState({
				pts: 6,
				wargearPts: 0,
				equipment: "shuriken pistol, chainsword, plasma grenades"
			});
		}
				
		if (wargearOptions.value === "none" && this.state.unit.unitType === "Storm Guardian Gunner") {
			this.setState({
				pts: 7,
				wargearPts: 0,
				equipment: "shuriken pistol, aeldari blade, plasma grenades"
			});
		}
		if (wargearOptions.value === "flamer" && this.state.unit.unitType === "Storm Guardian Gunner") {
			this.setState({
				pts: 7,
				wargearPts: 3,
				equipment: "flamer, plasma grenades"
			});
		}
		if (wargearOptions.value === "fusion gun" && this.state.unit.unitType === "Storm Guardian Gunner") {
			this.setState({
				pts: 7,
				wargearPts: 3,
				equipment: "fusion gun, plasma grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Dire Avenger Exarch") {
			this.setState({
				pts: 11,
				wargearPts: 0,
        equipment: "avenger shuriken catapult, plasma grenades"
			});
		}
		if (wargearOptions.value === "shuriken pistol power glaive" && this.state.unit.unitType === "Dire Avenger Exarch") {
			this.setState({
				pts: 11,
				wargearPts: 1,
        equipment: "shuriken pistol, power glaive, plasma grenades"
			});
		}
		if (wargearOptions.value === "shuriken pistol diresword" && this.state.unit.unitType === "Dire Avenger Exarch") {
			this.setState({
				pts: 11,
				wargearPts: 2,
        equipment: "shuriken pistol, diresword, plasma grenades"
			});
		}
		if (wargearOptions.value === "shimmershield power glaive" && this.state.unit.unitType === "Dire Avenger Exarch") {
			this.setState({
				pts: 11,
				wargearPts: 2,
        equipment: "shimmershield, power glaive, plasma grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Kabalite Gunner") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "splinter rifle"
			});
		}
		if (wargearOptions.value === "splinter cannon" && this.state.unit.unitType === "Kabalite Gunner") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "splinter cannon"
			});
		}
		if (wargearOptions.value === "dark lance" && this.state.unit.unitType === "Kabalite Gunner") {
			this.setState({
				pts: 8,
				wargearPts: 4,
        equipment: "dark lance"
			});
		}
		if (wargearOptions.value === "shredder" && this.state.unit.unitType === "Kabalite Gunner") {
			this.setState({
				pts: 8,
				wargearPts: 1,
        equipment: "shredder"
			});
		}
		if (wargearOptions.value === "blaster" && this.state.unit.unitType === "Kabalite Gunner") {
			this.setState({
				pts: 8,
				wargearPts: 3,
        equipment: "blaster"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Sybarite") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "splinter rifle"
			});
		}
		if (wargearOptions.value === "power sword" && this.state.unit.unitType === "Sybarite") {
			this.setState({
				pts: 8,
				wargearPts: 2,
        equipment: "splinter rifle, power sword"
			});
		}
		if (wargearOptions.value === "agonizer" && this.state.unit.unitType === "Sybarite") {
			this.setState({
				pts: 8,
				wargearPts: 2,
        equipment: "splinter rifle, agonizer"
			});
		}
		if (wargearOptions.value === "phantasm grenade launcher" && this.state.unit.unitType === "Sybarite") {
			this.setState({
				pts: 8,
				wargearPts: 1,
        equipment: "splinter rifle, phantasm grenade launcher"
			});
		}
		if (wargearOptions.value === "splinter pistol" && this.state.unit.unitType === "Sybarite") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "splinter pistol"
			});
		}
		if (wargearOptions.value === "blast pistol" && this.state.unit.unitType === "Sybarite") {
			this.setState({
				pts: 8,
				wargearPts: 2,
        equipment: "blast pistol"
			});
		}
		if (wargearOptions.value === "power sword phantasm grenade launcher" && this.state.unit.unitType === "Sybarite") {
			this.setState({
				pts: 8,
				wargearPts: 3,
        equipment: "power sword, phantasm grenade launcher"
			});
		}
		if (wargearOptions.value === "agonizer phantasm grenade launcher" && this.state.unit.unitType === "Sybarite") {
			this.setState({
				pts: 8,
				wargearPts: 3,
        equipment: "agonizer, phantasm grenade launcher"
			});
		}
		if (wargearOptions.value === "power sword blast pistol" && this.state.unit.unitType === "Sybarite") {
			this.setState({
				pts: 8,
				wargearPts: 4,
        equipment: "power sword, blast pistol"
			});
		}
		if (wargearOptions.value === "agonizer blast pistol" && this.state.unit.unitType === "Sybarite") {
			this.setState({
				pts: 8,
				wargearPts: 4,
        equipment: "agonizer, blast pistol"
			});
		}
		if (wargearOptions.value === "power sword splinter pistol" && this.state.unit.unitType === "Sybarite") {
			this.setState({
				pts: 8,
				wargearPts: 2,
        equipment: "power sword, splinter pistol"
			});
		}
		if (wargearOptions.value === "agonizer splinter pistol" && this.state.unit.unitType === "Sybarite") {
			this.setState({
				pts: 8,
				wargearPts: 2,
        equipment: "agonizer, splinter pistol"
			});
		}
		if (wargearOptions.value === "power sword splinter pistol phantasm grenade launcher" && this.state.unit.unitType === "Sybarite") {
			this.setState({
				pts: 8,
				wargearPts: 3,
        equipment: "power sword, splinter pistol, phantasm grenade launcher"
			});
		}
		if (wargearOptions.value === "agonizer splinter pistol phantasm grenade launcher" && this.state.unit.unitType === "Sybarite") {
			this.setState({
				pts: 8,
				wargearPts: 3,
        equipment: "agonizer, splinter pistol, phantasm grenade launcher"
			});
		}
		if (wargearOptions.value === "power sword blast pistol phantasm grenade launcher" && this.state.unit.unitType === "Sybarite") {
			this.setState({
				pts: 8,
				wargearPts: 5,
        equipment: "power sword, blast pistol, phantasm grenade launcher"
			});
		}
		if (wargearOptions.value === "agonizer blast pistol phantasm grenade launcher" && this.state.unit.unitType === "Sybarite") {
			this.setState({
				pts: 8,
				wargearPts: 5,
        equipment: "agonizer, blast pistol, phantasm grenade launcher"
			});
		}

    if (wargearOptions.value === "none" && this.state.unit.unitType === "Wych Fighter") {
			this.setState({
				pts: 9,
				wargearPts: 0,
        equipment: "splinter pistol, hekatarii blade, plasma grenades"
			});
		}
		if (wargearOptions.value === "hydra gauntlets" && this.state.unit.unitType === "Wych Fighter") {
			this.setState({
				pts: 9,
				wargearPts: 2,
        equipment: "hydra gauntlets, plasma grenades"
			});
		}
		if (wargearOptions.value === "razorflails" && this.state.unit.unitType === "Wych Fighter") {
			this.setState({
				pts: 9,
				wargearPts: 2,
        equipment: "razorflails, plasma grenades"
			});
		}
		if (wargearOptions.value === "shardnet and impaler" && this.state.unit.unitType === "Wych Fighter") {
			this.setState({
				pts: 9,
				wargearPts: 2,
        equipment: "shardnet and impaler, plasma grenades"
			});
		}

    if (wargearOptions.value === "none" && this.state.unit.unitType === "Hekatrix") {
			this.setState({
				pts: 9,
				wargearPts: 0,
        equipment: "splinter pistol, hekatarii blade, plasma grenades"
			});
		}
		if (wargearOptions.value === "power sword" && this.state.unit.unitType === "Hekatrix") {
			this.setState({
				pts: 9,
				wargearPts: 2,
        equipment: "splinter pistol, power sword, plasma grenades"
			});
		}
		if (wargearOptions.value === "agonizer" && this.state.unit.unitType === "Hekatrix") {
			this.setState({
				pts: 9,
				wargearPts: 2,
        equipment: "splinter pistol, agonizer, plasma grenades"
			});
		}
		if (wargearOptions.value === "blast pistol" && this.state.unit.unitType === "Hekatrix") {
			this.setState({
				pts: 9,
				wargearPts: 2,
        equipment: "blast pistol, hekatarii blade, plasma grenades"
			});
		}
		if (wargearOptions.value === "power sword blast pistol" && this.state.unit.unitType === "Hekatrix") {
			this.setState({
				pts: 9,
				wargearPts: 4,
        equipment: "blast pistol, power sword, plasma grenades"
			});
		}
		if (wargearOptions.value === "agonizer blast pistol" && this.state.unit.unitType === "Hekatrix") {
			this.setState({
				pts: 9,
				wargearPts: 4,
        equipment: "blast pistol, agonizer, plasma grenades"
			});
		}
		if (wargearOptions.value === "phantasm grenade launcher" && this.state.unit.unitType === "Hekatrix") {
			this.setState({
				pts: 9,
				wargearPts: 1,
        equipment: "phantasm grenade launcher, splinter pistol, hekatarii blade, plasma grenades"
			});
		}
		if (wargearOptions.value === "power sword phantasm grenade launcher" && this.state.unit.unitType === "Hekatrix") {
			this.setState({
				pts: 9,
				wargearPts: 3,
        equipment: "phantasm grenade launcher, splinter pistol, power sword, plasma grenades"
			});
		}
		if (wargearOptions.value === "agonizer phantasm grenade launcher" && this.state.unit.unitType === "Hekatrix") {
			this.setState({
				pts: 9,
				wargearPts: 3,
        equipment: "phantasm grenade launcher, splinter pistol, agonizer, plasma grenades"
			});
		}
		if (wargearOptions.value === "power sword blast pistol phantasm grenade launcher" && this.state.unit.unitType === "Hekatrix") {
			this.setState({
				pts: 9,
				wargearPts: 5,
        equipment: "phantasm grenade launcher, splinter pistol, power sword, blast pistol, plasma grenades"
			});
		}
		if (wargearOptions.value === "agonizer blast pistol phantasm grenade launcher" && this.state.unit.unitType === "Hekatrix") {
			this.setState({
				pts: 9,
				wargearPts: 5,
        equipment: "phantasm grenade launcher, splinter pistol, agonizer, blast pistol, plasma grenades"
			});
		}

    if (wargearOptions.value === "none" && this.state.unit.unitType === "Player") {
			this.setState({
				pts: 12,
				wargearPts: 0,
        equipment: "shuriken pistol, harlequin's blade, plasma grenades"
			});
		}
		if (wargearOptions.value === "neuro disruptor" && this.state.unit.unitType === "Player") {
			this.setState({
				pts: 12,
				wargearPts: 2,
        equipment: "neuro disruptor, harlequin's blade, plasma grenades"
			});
		}
		if (wargearOptions.value === "fusion pistol" && this.state.unit.unitType === "Player") {
			this.setState({
				pts: 12,
				wargearPts: 3,
        equipment: "fusion pistol, harlequin's blade, plasma grenades"
			});
		}
		if (wargearOptions.value === "harlequin's caress" && this.state.unit.unitType === "Player") {
			this.setState({
				pts: 12,
				wargearPts: 3,
        equipment: "shuriken pistol, harlequin's caress, plasma grenades"
			});
		}
		if (wargearOptions.value === "harlequin's embrace" && this.state.unit.unitType === "Player") {
			this.setState({
				pts: 12,
				wargearPts: 2,
        equipment: "shuriken pistol, harlequin's embrace, plasma grenades"
			});
		}
		if (wargearOptions.value === "harlequin's kiss" && this.state.unit.unitType === "Player") {
			this.setState({
				pts: 12,
				wargearPts: 4,
        equipment: "shuriken pistol, harlequin's kiss, plasma grenades"
			});
		}
		if (wargearOptions.value === "neuro disruptor harlequin's caress" && this.state.unit.unitType === "Player") {
			this.setState({
				pts: 12,
				wargearPts: 5,
        equipment: "neuro disruptor, harlequin's caress, plasma grenades"
			});
		}
		if (wargearOptions.value === "neuro disruptor harlequin's embrace" && this.state.unit.unitType === "Player") {
			this.setState({
				pts: 12,
				wargearPts: 4,
        equipment: "neuro disruptor, harlequin's embrace, plasma grenades"
			});
		}
		if (wargearOptions.value === "neuro disruptor harlequin's kiss" && this.state.unit.unitType === "Player") {
			this.setState({
				pts: 12,
				wargearPts: 6,
        equipment: "neuro disruptor, harlequin's kiss, plasma grenades"
			});
		}
		if (wargearOptions.value === "fusion pistol harlequin's caress" && this.state.unit.unitType === "Player") {
			this.setState({
				pts: 12,
				wargearPts: 6,
        equipment: "fusion pistol, harlequin's caress, plasma grenades"
			});
		}
		if (wargearOptions.value === "fusion pistol harlequin's embrace" && this.state.unit.unitType === "Player") {
			this.setState({
				pts: 12,
				wargearPts: 5,
        equipment: "fusion pistol, harlequin's embrace, plasma grenades"
			});
		}
		if (wargearOptions.value === "fusion pistol harlequin's kiss" && this.state.unit.unitType === "Player") {
			this.setState({
				pts: 12,
				wargearPts: 7,
        equipment: "fusion pistol, harlequin's kiss, plasma grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Immortal") {
			this.setState({
				pts: 16,
				wargearPts: 0,
        equipment: "gauss blaster"
			});
		}
		if (wargearOptions.value === "tesla carbine" && this.state.unit.unitType === "Immortal") {
			this.setState({
				pts: 16,
				wargearPts: 0,
        equipment: "tesla carbine"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Ork Boy") {
			this.setState({
				pts: 6,
				wargearPts: 0,
        equipment: "slugga, choppa, stikkbombs"
			});
		}
		if (wargearOptions.value === "shoota" && this.state.unit.unitType === "Ork Boy") {
			this.setState({
				pts: 6,
				wargearPts: 0,
        equipment: "shoota, stikkbombs"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Ork Boy Gunner") {
			this.setState({
				pts: 7,
				wargearPts: 0,
        equipment: "slugga, choppa, stikkbombs"
			});
		}
		if (wargearOptions.value === "big shoota" && this.state.unit.unitType === "Ork Boy Gunner") {
			this.setState({
				pts: 7,
				wargearPts: 0,
        equipment: "big shoota, stikkbombs"
			});
		}
		if (wargearOptions.value === "rokkit launcha" && this.state.unit.unitType === "Ork Boy Gunner") {
			this.setState({
				pts: 7,
				wargearPts: 3,
        equipment: "rokkit launcha, stikkbombs"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Boss Nob") {
			this.setState({
				pts: 10,
				wargearPts: 0,
        equipment: "slugga, choppa, stikkbombs"
			});
		}
		if (wargearOptions.value === "big choppa" && this.state.unit.unitType === "Boss Nob") {
			this.setState({
				pts: 10,
				wargearPts: 2,
        equipment: "slugga, big choppa, stikkbombs"
			});
		}
		if (wargearOptions.value === "power klaw" && this.state.unit.unitType === "Boss Nob") {
			this.setState({
				pts: 10,
				wargearPts: 4,
        equipment: "slugga, power klaw, stikkbombs"
			});
		}
		if (wargearOptions.value === "kombi-weapon with rokkit launcha" && this.state.unit.unitType === "Boss Nob") {
			this.setState({
				pts: 10,
				wargearPts: 3,
        equipment: "kombi-weapon with rokkit launcha, choppa, stikkbombs"
			});
		}
		if (wargearOptions.value === "big choppa kombi-weapon with rokkit launcha" && this.state.unit.unitType === "Boss Nob") {
			this.setState({
				pts: 10,
				wargearPts: 5,
        equipment: "kombi-weapon with rokkit launcha, big choppa, stikkbombs"
			});
		}
		if (wargearOptions.value === "power klaw kombi-weapon with rokkit launcha" && this.state.unit.unitType === "Boss Nob") {
			this.setState({
				pts: 10,
				wargearPts: 7,
        equipment: "kombi-weapon with rokkit launcha, power klaw, stikkbombs"
			});
		}
		if (wargearOptions.value === "kombi-weapon with skorcha" && this.state.unit.unitType === "Boss Nob") {
			this.setState({
				pts: 10,
				wargearPts: 4,
        equipment: "kombi-weapon with skorcha, choppa, stikkbombs"
			});
		}
		if (wargearOptions.value === "big choppa kombi-weapon with skorcha" && this.state.unit.unitType === "Boss Nob") {
			this.setState({
				pts: 10,
				wargearPts: 6,
        equipment: "kombi-weapon with skorcha, big choppa, stikkbombs"
			});
		}
		if (wargearOptions.value === "power klaw kombi-weapon with skorcha" && this.state.unit.unitType === "Boss Nob") {
			this.setState({
				pts: 10,
				wargearPts: 8,
        equipment: "kombi-weapon with skorcha, power klaw, stikkbombs"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Kommando Boss Nob") {
			this.setState({
				pts: 12,
				wargearPts: 0,
        equipment: "slugga, choppa, stikkbombs"
			});
		}
		if (wargearOptions.value === "power klaw" && this.state.unit.unitType === "Kommando Boss Nob") {
			this.setState({
				pts: 12,
				wargearPts: 4,
        equipment: "slugga, power klaw, stikkbombs"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Burna Spanner") {
			this.setState({
				pts: 10,
				wargearPts: 0,
        equipment: "big shoota, stikkbombs"
			});
		}
		if (wargearOptions.value === "kustom mega-blasta" && this.state.unit.unitType === "Burna Spanner") {
			this.setState({
				pts: 10,
				wargearPts: 0,
        equipment: "kustom mega-blasta, stikkbombs"
			});
		}
		if (wargearOptions.value === "rokkit launcha" && this.state.unit.unitType === "Burna Spanner") {
			this.setState({
				pts: 10,
				wargearPts: 3,
        equipment: "rokkit launcha, stikkbombs"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Loota Spanner") {
			this.setState({
				pts: 10,
				wargearPts: 0,
        equipment: "big shoota, stikkbombs"
			});
		}
		if (wargearOptions.value === "kustom mega-blasta" && this.state.unit.unitType === "Loota Spanner") {
			this.setState({
				pts: 10,
				wargearPts: 0,
        equipment: "kustom mega-blasta, stikkbombs"
			});
		}
		if (wargearOptions.value === "rokkit launcha" && this.state.unit.unitType === "Loota Spanner") {
			this.setState({
				pts: 10,
				wargearPts: 3,
        equipment: "rokkit launcha, stikkbombs"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Shasla") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "pulse rifle, photon grenades"
			});
		}
		if (wargearOptions.value === "pulse carbine" && this.state.unit.unitType === "Shasla") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "pulse carbine, photon grenades"
			});
		}
		if (wargearOptions.value === "pulse pistol" && this.state.unit.unitType === "Shasla") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "pulse rifle, pulse pistol, photon grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Shasui") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "pulse rifle, photon grenades"
			});
		}
		if (wargearOptions.value === "pulse carbine" && this.state.unit.unitType === "Shasui") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "pulse carbine, photon grenades"
			});
		}
		if (wargearOptions.value === "pulse pistol" && this.state.unit.unitType === "Shasui") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "pulse rifle, pulse pistol, photon grenades"
			});
		}
		if (wargearOptions.value === "markerlight" && this.state.unit.unitType === "Shasui") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "pulse rifle, markerlight, photon grenades"
			});
		}
		if (wargearOptions.value === "pulse carbine markerlight" && this.state.unit.unitType === "Shasui") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "pulse carbine, markerlight, photon grenades"
			});
		}
		if (wargearOptions.value === "pulse pistol markerlight" && this.state.unit.unitType === "Shasui") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "pulse pistol, markerlight, photon grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Pathfinder Gunner") {
			this.setState({
				pts: 7,
				wargearPts: 0,
        equipment: "pulse carbine, markerlight, photon grenades"
			});
		}
		if (wargearOptions.value === "ion rifle" && this.state.unit.unitType === "Pathfinder Gunner") {
			this.setState({
				pts: 7,
				wargearPts: 3,
        equipment: "ion rifle, photon grenades"
			});
		}
		if (wargearOptions.value === "rail rifle" && this.state.unit.unitType === "Pathfinder Gunner") {
			this.setState({
				pts: 7,
				wargearPts: 5,
        equipment: "rail rifle, photon grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Pathfinder Shasui") {
			this.setState({
				pts: 7,
				wargearPts: 0,
        equipment: "pulse carbine, markerlight, photon grenades"
			});
		}
		if (wargearOptions.value === "pulse pistol" && this.state.unit.unitType === "Pathfinder Shasui") {
			this.setState({
				pts: 7,
				wargearPts: 0,
        equipment: "pulse carbine, pulse pistol, markerlight, photon grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Breacher Shasla") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "pulse blaster, photon grenades"
			});
		}
		if (wargearOptions.value === "pulse pistol" && this.state.unit.unitType === "Breacher Shasla") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "pulse blaster, pulse pistol, photon grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Breacher Shasui") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "pulse blaster, photon grenades"
			});
		}
		if (wargearOptions.value === "pulse pistol" && this.state.unit.unitType === "Breacher Shasui") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "pulse blaster, pulse pistol, photon grenades"
			});
		}
		if (wargearOptions.value === "markerlight" && this.state.unit.unitType === "Breacher Shasui") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "pulse blaster, markerlight, photon grenades"
			});
		}
		if (wargearOptions.value === "pulse pistol markerlight" && this.state.unit.unitType === "Breacher Shasui") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "pulse blaster, pulse pistol, markerlight, photon grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Stealth Shasui") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "burst cannon"
			});
		}
		if (wargearOptions.value === "fusion blaster" && this.state.unit.unitType === "Stealth Shasui") {
			this.setState({
				pts: 20,
				wargearPts: 4,
        equipment: "fusion blaster"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Stealth Shasvre") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "burst cannon"
			});
		}
		if (wargearOptions.value === "fusion blaster" && this.state.unit.unitType === "Stealth Shasvre") {
			this.setState({
				pts: 20,
				wargearPts: 4,
        equipment: "fusion blaster"
			});
		}
		if (wargearOptions.value === "markerlight and target lock" && this.state.unit.unitType === "Stealth Shasvre") {
			this.setState({
				pts: 20,
				wargearPts: 1,
        equipment: "burst cannon, markerlight"
			});
		}
		if (wargearOptions.value === "fusion blaster markerlight and target lock" && this.state.unit.unitType === "Stealth Shasvre") {
			this.setState({
				pts: 20,
				wargearPts: 5,
        equipment: "fusion blaster, markerlight"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Termagant") {
			this.setState({
				pts: 4,
				wargearPts: 0,
        equipment: "fleshborer"
			});
		}
		if (wargearOptions.value === "devourer" && this.state.unit.unitType === "Termagant") {
			this.setState({
				pts: 4,
				wargearPts: 3,
        equipment: "devourer"
			});
		}
		if (wargearOptions.value === "spinefists" && this.state.unit.unitType === "Termagant") {
			this.setState({
				pts: 4,
				wargearPts: 0,
        equipment: "spinefists"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "scything talons, devourer"
			});
		}
		if (wargearOptions.value === "rending claws" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 1,
        equipment: "rending claws, devourer"
			});
		}
		if (wargearOptions.value === "boneswords" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "boneswords, devourer"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 1,
        equipment: "lash whip and bonesword, devourer"
			});
		}
		if (wargearOptions.value === "deathspitter" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 2,
        equipment: "scything talons, deathspitter"
			});
		}
		if (wargearOptions.value === "rending claws deathspitter" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 2,
        equipment: "rending claws, deathspitter"
			});
		}
		if (wargearOptions.value === "boneswords deathspitter" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 2,
        equipment: "boneswords, deathspitter"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword deathspitter" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 3,
        equipment: "lash whip and bonesword, deathspitter"
			});
		}
		if (wargearOptions.value === "spinefists" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "scything talons, spinefists"
			});
		}
		if (wargearOptions.value === "rending claws spinefists" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "rending claws, spinefists"
			});
		}
		if (wargearOptions.value === "boneswords spinefists" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "boneswords, spinefists"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword spinefists" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 1,
        equipment: "lash whip and bonesword, spinefists"
			});
		}
		if (wargearOptions.value === "scything talons rending claws" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "scything talons, rending claws"
			});
		}
		if (wargearOptions.value === "rending claws x2" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "rending claws, rending claws"
			});
		}
		if (wargearOptions.value === "boneswords rending claws" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "boneswords, rending claws"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword rending claws" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 1,
        equipment: "lash whip and bonesword, rending claws"
			});
		}
		if (wargearOptions.value === "scything talons x2" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "scything talons, scything talons"
			});
		}
		if (wargearOptions.value === "boneswords scything talons " && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "boneswords, scything talons"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword scything talons" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 1,
        equipment: "lash whip and bonesword, scything talons"
			});
		}
		if (wargearOptions.value === "boneswords x2" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "boneswords, boneswords"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword boneswords" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "lash whip and bonesword, boneswords"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword x2" && this.state.unit.unitType === "Tyranid Warrior") {
			this.setState({
				pts: 20,
				wargearPts: 2,
        equipment: "lash whip and bonesword, lash whip and bonesword"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "scything talons, devourer"
			});
		}
		if (wargearOptions.value === "rending claws" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 1,
        equipment: "rending claws, devourer"
			});
		}
		if (wargearOptions.value === "boneswords" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "boneswords, devourer"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 1,
        equipment: "lash whip and bonesword, devourer"
			});
		}
		if (wargearOptions.value === "deathspitter" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 2,
        equipment: "scything talons, deathspitter"
			});
		}
		if (wargearOptions.value === "rending claws deathspitter" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 2,
        equipment: "rending claws, deathspitter"
			});
		}
		if (wargearOptions.value === "boneswords deathspitter" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 2,
        equipment: "boneswords, deathspitter"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword deathspitter" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 3,
        equipment: "lash whip and bonesword, deathspitter"
			});
		}
		if (wargearOptions.value === "spinefists" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "scything talons, spinefists"
			});
		}
		if (wargearOptions.value === "rending claws spinefists" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "rending claws, spinefists"
			});
		}
		if (wargearOptions.value === "boneswords spinefists" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "boneswords, spinefists"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword spinefists" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 1,
        equipment: "lash whip and bonesword, spinefists"
			});
		}
		if (wargearOptions.value === "scything talons rending claws" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "scything talons, rending claws"
			});
		}
		if (wargearOptions.value === "rending claws x2" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "rending claws, rending claws"
			});
		}
		if (wargearOptions.value === "boneswords rending claws" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "boneswords, rending claws"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword rending claws" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 1,
        equipment: "lash whip and bonesword, rending claws"
			});
		}
		if (wargearOptions.value === "scything talons x2" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "scything talons, scything talons"
			});
		}
		if (wargearOptions.value === "boneswords scything talons " && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "boneswords, scything talons"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword scything talons" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 1,
        equipment: "lash whip and bonesword, scything talons"
			});
		}
		if (wargearOptions.value === "boneswords x2" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "boneswords, boneswords"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword boneswords" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 0,
        equipment: "lash whip and bonesword, boneswords"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword x2" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 2,
        equipment: "lash whip and bonesword, lash whip and bonesword"
			});
		}
		if (wargearOptions.value === "barbed strangler" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 3,
        equipment: "scything talons, barbed strangler"
			});
		}
  	if (wargearOptions.value === "rending claws barbed strangler" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 3,
        equipment: "rending claws, barbed strangler"
			});
		}
		if (wargearOptions.value === "boneswords barbed strangler" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 3,
        equipment: "boneswords, barbed strangler"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword barbed strangler" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 4,
        equipment: "lash whip and bonesword, barbed strangler"
			});
		}
		if (wargearOptions.value === "venom cannon" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 4,
        equipment: "scything talons, venom cannon"
			});
		}
  	if (wargearOptions.value === "rending claws venom cannon" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 4,
        equipment: "rending claws, venom cannon"
			});
		}
		if (wargearOptions.value === "boneswords venom cannon" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 4,
        equipment: "boneswords, venom cannon"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword venom cannon" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
			this.setState({
				pts: 20,
				wargearPts: 5,
        equipment: "lash whip and bonesword, venom cannon"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Genestealer") {
			this.setState({
				pts: 11,
				wargearPts: 0,
        equipment: "rending claws"
			});
		}
		if (wargearOptions.value === "scything talons" && this.state.unit.unitType === "Genestealer") {
			this.setState({
				pts: 11,
				wargearPts: 0,
        equipment: "rending claws, scything talons"
			});
		}
		if (wargearOptions.value === "flesh hooks" && this.state.unit.unitType === "Genestealer") {
			this.setState({
				pts: 11,
				wargearPts: 0,
        equipment: "rending claws, flesh hooks"
			});
		}
		if (wargearOptions.value === "scything talons flesh hooks" && this.state.unit.unitType === "Genestealer") {
			this.setState({
				pts: 11,
				wargearPts: 0,
        equipment: "scything talons, flesh hooks"
			});
		}
		if (wargearOptions.value === "acid maw" && this.state.unit.unitType === "Genestealer") {
			this.setState({
				pts: 11,
				wargearPts: 0,
        equipment: "rending claws, acid maw"
			});
		}
		if (wargearOptions.value === "scything talons acid maw" && this.state.unit.unitType === "Genestealer") {
			this.setState({
				pts: 11,
				wargearPts: 0,
        equipment: "scything talons, acid maw"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Acolyte Hybrid") {
			this.setState({
				pts: 5,
				wargearPts: 0,
        equipment: "autopistol, cultist knife, rending claw, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer" && this.state.unit.unitType === "Acolyte Hybrid") {
			this.setState({
				pts: 5,
				wargearPts: 2,
        equipment: "hand flamer, cultist knife, rending claw, blasting charges"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Acolyte Fighter") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "autopistol, cultist knife, rending claw, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer" && this.state.unit.unitType === "Acolyte Fighter") {
			this.setState({
				pts: 8,
				wargearPts: 2,
        equipment: "hand flamer, cultist knife, rending claw, blasting charges"
			});
		}
		if (wargearOptions.value === "heavy rock drill" && this.state.unit.unitType === "Acolyte Fighter") {
			this.setState({
				pts: 8,
				wargearPts: 5,
        equipment: "autopistol, heavy rock drill, blasting charges"
			});
		}
		if (wargearOptions.value === "heavy rock saw" && this.state.unit.unitType === "Acolyte Fighter") {
			this.setState({
				pts: 8,
				wargearPts: 4,
        equipment: "autopistol, heavy rock saw, blasting charges"
			});
		}
		if (wargearOptions.value === "heavy rock cutter" && this.state.unit.unitType === "Acolyte Fighter") {
			this.setState({
				pts: 8,
				wargearPts: 4,
        equipment: "autopistol, heavy rock cutter, blasting charges"
			});
		}
		if (wargearOptions.value === "demolition charges" && this.state.unit.unitType === "Acolyte Fighter") {
			this.setState({
				pts: 8,
				wargearPts: 3,
        equipment: "autopistol, demolition charges, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer heavy rock drill" && this.state.unit.unitType === "Acolyte Fighter") {
			this.setState({
				pts: 8,
				wargearPts: 5,
        equipment: "hand flamer, heavy rock drill, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer heavy rock saw" && this.state.unit.unitType === "Acolyte Fighter") {
			this.setState({
				pts: 8,
				wargearPts: 4,
        equipment: "hand flamer, heavy rock saw, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer heavy rock cutter" && this.state.unit.unitType === "Acolyte Fighter") {
			this.setState({
				pts: 8,
				wargearPts: 4,
        equipment: "hand flamer, heavy rock cutter, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer demolition charges" && this.state.unit.unitType === "Acolyte Fighter") {
			this.setState({
				pts: 8,
				wargearPts: 3,
        equipment: "hand flamer, demolition charges, blasting charges"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Acolyte Leader") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "autopistol, cultist knife, rending claw, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer" && this.state.unit.unitType === "Acolyte Leader") {
			this.setState({
				pts: 8,
				wargearPts: 2,
        equipment: "hand flamer, cultist knife, rending claw, blasting charges"
			});
		}
		if (wargearOptions.value === "bonesword" && this.state.unit.unitType === "Acolyte Leader") {
			this.setState({
				pts: 8,
				wargearPts: 1,
        equipment: "autopistol, bonesword, rending claw, blasting charges"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword" && this.state.unit.unitType === "Acolyte Leader") {
			this.setState({
				pts: 8,
				wargearPts: 2,
        equipment: "lash whip and bonesword, rending claw, blasting charges"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Aberrant") {
			this.setState({
				pts: 15,
				wargearPts: 0,
        equipment: "power pick, rending claw"
			});
		}
		if (wargearOptions.value === "power hammer" && this.state.unit.unitType === "Aberrant") {
			this.setState({
				pts: 15,
				wargearPts: 4,
        equipment: "power hammer, rending claw"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Neophyte Hybrid") {
			this.setState({
				pts: 5,
				wargearPts: 0,
        equipment: "autogun, autopistol, blasting charges"
			});
		}
		if (wargearOptions.value === "shotgun" && this.state.unit.unitType === "Neophyte Hybrid") {
			this.setState({
				pts: 5,
				wargearPts: 0,
        equipment: "shotgun, autopistol, blasting charges"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Neophyte Gunner") {
			this.setState({
				pts: 6,
				wargearPts: 0,
        equipment: "autogun, autopistol, blasting charges"
			});
		}
		if (wargearOptions.value === "shotgun" && this.state.unit.unitType === "Neophyte Gunner") {
			this.setState({
				pts: 6,
				wargearPts: 0,
        equipment: "shotgun, autopistol, blasting charges"
			});
		}
		if (wargearOptions.value === "flamer" && this.state.unit.unitType === "Neophyte Gunner") {
			this.setState({
				pts: 6,
				wargearPts: 3,
        equipment: "flamer, autopistol, blasting charges"
			});
		}
		if (wargearOptions.value === "grenade launcher" && this.state.unit.unitType === "Neophyte Gunner") {
			this.setState({
				pts: 6,
				wargearPts: 2,
        equipment: "grenade launcher, autopistol, blasting charges"
			});
		}
		if (wargearOptions.value === "webber" && this.state.unit.unitType === "Neophyte Gunner") {
			this.setState({
				pts: 6,
				wargearPts: 1,
        equipment: "webber, autopistol, blasting charges"
			});
		}
		if (wargearOptions.value === "heavy stubber" && this.state.unit.unitType === "Neophyte Gunner") {
			this.setState({
				pts: 6,
				wargearPts: 0,
        equipment: "heavy stubber, autopistol, blasting charges"
			});
		}
		if (wargearOptions.value === "mining laser" && this.state.unit.unitType === "Neophyte Gunner") {
			this.setState({
				pts: 6,
				wargearPts: 3,
        equipment: "mining laser, autopistol, blasting charges"
			});
		}
		if (wargearOptions.value === "seismic cannon" && this.state.unit.unitType === "Neophyte Gunner") {
			this.setState({
				pts: 6,
				wargearPts: 2,
        equipment: "seismic cannon, autopistol, blasting charges"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Hybrid Metamorph") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "autopistol, rending claw, metamorph talon, blasting charges"
			});
		}
		if (wargearOptions.value === "metamorph talon" && this.state.unit.unitType === "Hybrid Metamorph") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "autopistol, metamorph talon, metamorph talon, blasting charges"
			});
		}
		if (wargearOptions.value === "metamorph whip" && this.state.unit.unitType === "Hybrid Metamorph") {
			this.setState({
				pts: 8,
				wargearPts: 1,
        equipment: "autopistol, rending claw, metamorph whip, blasting charges"
			});
		}
		if (wargearOptions.value === "metamorph claw" && this.state.unit.unitType === "Hybrid Metamorph") {
			this.setState({
				pts: 8,
				wargearPts: 2,
        equipment: "autopistol, metamorph claw, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer metamorph talon" && this.state.unit.unitType === "Hybrid Metamorph") {
			this.setState({
				pts: 8,
				wargearPts: 1,
        equipment: "hand flamer, metamorph talon, metamorph talon, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer metamorph whip" && this.state.unit.unitType === "Hybrid Metamorph") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "hand flamer, rending claw, metamorph whip, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer metamorph claw" && this.state.unit.unitType === "Hybrid Metamorph") {
			this.setState({
				pts: 8,
				wargearPts: 3,
        equipment: "hand flamer, metamorph claw, blasting charges"
			});
		}

		if (wargearOptions.value === "none" && this.state.unit.unitType === "Metamorph Leader") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "autopistol, rending claw, metamorph talon, blasting charges"
			});
		}
		if (wargearOptions.value === "metamorph talon" && this.state.unit.unitType === "Metamorph Leader") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "autopistol, metamorph talon, metamorph talon, blasting charges"
			});
		}
		if (wargearOptions.value === "metamorph whip" && this.state.unit.unitType === "Metamorph Leader") {
			this.setState({
				pts: 8,
				wargearPts: 1,
        equipment: "autopistol, rending claw, metamorph whip, blasting charges"
			});
		}
		if (wargearOptions.value === "metamorph claw" && this.state.unit.unitType === "Metamorph Leader") {
			this.setState({
				pts: 8,
				wargearPts: 2,
        equipment: "autopistol, metamorph claw, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer metamorph talon" && this.state.unit.unitType === "Metamorph Leader") {
			this.setState({
				pts: 8,
				wargearPts: 1,
        equipment: "hand flamer, metamorph talon, metamorph talon, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer metamorph whip" && this.state.unit.unitType === "Metamorph Leader") {
			this.setState({
				pts: 8,
				wargearPts: 0,
        equipment: "hand flamer, rending claw, metamorph whip, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer metamorph claw" && this.state.unit.unitType === "Metamorph Leader") {
			this.setState({
				pts: 8,
				wargearPts: 3,
        equipment: "hand flamer, metamorph claw, blasting charges"
			});
		}


	}
			
	handleChange4 = (wargearOptions2) => {
    if (wargearOptions2.value === "none" && this.state.unit.unitType === "Reiver") {
      this.setState({
				pts: 16,
        wargearPts2: 0,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, Terror Troops"
      });
    }
    if (wargearOptions2.value === "Grav-Chute" && this.state.unit.unitType === "Reiver") {
      this.setState({
				pts: 16,
        wargearPts2: 1,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, Terror Troops, Grav-Chute"
      });
    }
    if (wargearOptions2.value === "Grapnel Launcher" && this.state.unit.unitType === "Reiver") {
      this.setState({
				pts: 16,
        wargearPts2: 1,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, Terror Troops, Grapnel Launcher"
      });
    }
    if (wargearOptions2.value === "Grav-Chute Grapnel Launcher" && this.state.unit.unitType === "Reiver") {
      this.setState({
				pts: 16,
        wargearPts2: 2,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, Terror Troops, Grav-Chute, Grapnel Launcher"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unit.unitType === "Reiver Sergeant") {
      this.setState({
				pts: 17,
        wargearPts2: 0,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, Terror Troops"
      });
    }
    if (wargearOptions2.value === "Grav-Chute" && this.state.unit.unitType === "Reiver Sergeant") {
      this.setState({
				pts: 17,
        wargearPts2: 1,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, Terror Troops, Grav-Chute"
      });
    }
    if (wargearOptions2.value === "Grapnel Launcher" && this.state.unit.unitType === "Reiver Sergeant") {
      this.setState({
				pts: 17,
        wargearPts2: 1,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, Terror Troops, grapnel chute"
      });
    }
    if (wargearOptions2.value === "Grav-Chute Grapnel Launcher" && this.state.unit.unitType === "Reiver Sergeant") {
      this.setState({
				pts: 17,
        wargearPts2: 2,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, Terror Troops, Grav-Chute, Grapnel Launcher"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unit.unitType === "Guardsman") {
      this.setState({
				pts: 5,
        wargearPts2: 0,
        abilities: ""
      });
    }
    if (wargearOptions2.value === "Vox-Caster" && this.state.unit.unitType === "Guardsman") {
      this.setState({
				pts: 5,
        wargearPts2: 5,
        abilities: "Vox-Caster"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unit.unitType === "Scion") {
      this.setState({
				pts: 9,
        wargearPts2: 0,
        abilities: ""
      });
    }
    if (wargearOptions2.value === "Vox-Caster" && this.state.unit.unitType === "Scion") {
      this.setState({
				pts: 9,
        wargearPts2: 5,
        abilities: "Vox-Caster"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unit.unitType === "Skitarii Ranger") {
      this.setState({
				pts: 9,
        wargearPts2: 0,
        abilities: "Canticles of the Omnissiah, Bionics"
      });
    }
    if (wargearOptions2.value === "Enhanced Data-Tether" && this.state.unit.unitType === "Skitarii Ranger") {
      this.setState({
				pts: 9,
        wargearPts2: 5,
        abilities: "Canticles of the Omnissiah, Bionics, Enhanced Data-Tether"
      });
    }
    if (wargearOptions2.value === "Omnispex" && this.state.unit.unitType === "Skitarii Ranger") {
      this.setState({
				pts: 9,
        wargearPts2: 1,
        abilities: "Canticles of the Omnissiah, Bionics, Omnispex"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unit.unitType === "Skitarii Vanguard") {
      this.setState({
				pts: 9,
        wargearPts2: 0,
        abilities: "Canticles of the Omnissiah, Bionics, Rad-Saturation"
      });
    }
    if (wargearOptions2.value === "Enhanced Data-Tether" && this.state.unit.unitType === "Skitarii Vanguard") {
      this.setState({
				pts: 9,
        wargearPts2: 5,
        abilities: "Canticles of the Omnissiah, Bionics, Rad-Saturation, Enhanced Data-Tether"
      });
    }
    if (wargearOptions2.value === "Omnispex" && this.state.unit.unitType === "Skitarii Vanguard") {
      this.setState({
				pts: 9,
        wargearPts2: 1,
        abilities: "Canticles of the Omnissiah, Bionics, Rad-Saturation, Omnispex"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unit.unitType === "Chaos Space Marine") {
      this.setState({
				pts: 12,
        wargearPts2: 0,
        abilities: "Death to the False Emperor, Transhuman Physiology, Mark of Chaos"
      });
    }
    if (wargearOptions2.value === "Icon of Despair" && this.state.unit.unitType === "Chaos Space Marine") {
      this.setState({
				pts: 12,
        wargearPts2: 3,
        abilities: "Death to the False Emperor, Transhuman Physiology, mark of nurgle, Icon of Despair"
      });
    }
    if (wargearOptions2.value === "Icon of Wrath" && this.state.unit.unitType === "Chaos Space Marine") {
      this.setState({
				pts: 12,
        wargearPts2: 5,
        abilities: "Death to the False Emperor, Transhuman Physiology, mark of khorne, Icon of Wrath"
      });
    }
    if (wargearOptions2.value === "Icon of Flame" && this.state.unit.unitType === "Chaos Space Marine") {
      this.setState({
				pts: 12,
        wargearPts2: 1,
        abilities: "Death to the False Emperor, Transhuman Physiology, mark of tzeentch, Icon of Flame"
      });
    }
    if (wargearOptions2.value === "Icon of Excess" && this.state.unit.unitType === "Chaos Space Marine") {
      this.setState({
				pts: 12,
        wargearPts2: 5,
        abilities: "Death to the False Emperor, Transhuman Physiology, mark of slaanesh, Icon of Excess"
      });
    }
    if (wargearOptions2.value === "Icon of Vengeance" && this.state.unit.unitType === "Chaos Space Marine") {
      this.setState({
				pts: 12,
        wargearPts2: 1,
        abilities: "Death to the False Emperor, Transhuman Physiology, Mark of Chaos, Icon of Vengeance"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unit.unitType === "Plague Marine") {
      this.setState({
				pts: 14,
        wargearPts2: 0,
        abilities: "Death to the False Emperor, Transhuman Physiology, Disgustingly Resilient"
      });
    }
    if (wargearOptions2.value === "Icon of Despair" && this.state.unit.unitType === "Plague Marine") {
      this.setState({
				pts: 14,
        wargearPts2: 3,
        abilities: "Death to the False Emperor, Transhuman Physiology, Disgustingly Resilient, Icon of Despair"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unit.unitType === "Rubric Marine") {
      this.setState({
				pts: 16,
        wargearPts2: 0,
        abilities: "Death to the False Emperor, All is Dust, Favoured of Tzeentch"
      });
    }
    if (wargearOptions2.value === "Icon of Flame" && this.state.unit.unitType === "Rubric Marine") {
      this.setState({
				pts: 16,
        wargearPts2: 1,
        abilities: "Death to the False Emperor, All is Dust, Favoured of Tzeentch, Icon of Flame"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unit.unitType === "Tzaangor") {
      this.setState({
				pts: 7,
        wargearPts2: 0,
        abilities: "Aura of Dark Glory"
      });
    }
    if (wargearOptions2.value === "Brayhorn" && this.state.unit.unitType === "Tzaangor") {
      this.setState({
				pts: 7,
        wargearPts2: 3,
        abilities: "Aura of Dark Glory, Brayhorn"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unit.unitType === "Termagant") {
      this.setState({
				pts: 4,
        wargearPts2: 0,
        abilities: "Instinctive Behaviour"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands" && this.state.unit.unitType === "Termagant") {
      this.setState({
				pts: 4,
        wargearPts2: 1,
        abilities: "Instinctive Behaviour, Adrenal Glands"
      });
    }
    if (wargearOptions2.value === "Toxin Sacs" && this.state.unit.unitType === "Termagant") {
      this.setState({
				pts: 4,
        wargearPts2: 1,
        abilities: "Instinctive Behaviour, Toxin Sacs"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands Toxin Sacs" && this.state.unit.unitType === "Termagant") {
      this.setState({
				pts: 4,
        wargearPts2: 2,
        abilities: "Instinctive Behaviour, Adrenal Glands, toxin glands"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unit.unitType === "Hormagaunt") {
      this.setState({
				pts: 4,
        wargearPts2: 0,
        abilities: "Instinctive Behaviour, Bounding Leap"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands" && this.state.unit.unitType === "Hormagaunt") {
      this.setState({
				pts: 4,
        wargearPts2: 1,
        abilities: "Instinctive Behaviour, Bounding Leap, Adrenal Glands"
      });
    }
    if (wargearOptions2.value === "Toxin Sacs" && this.state.unit.unitType === "Hormagaunt") {
      this.setState({
				pts: 4,
        wargearPts2: 1,
        abilities: "Instinctive Behaviour, Bounding Leap, Toxin Sacs"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands Toxin Sacs" && this.state.unit.unitType === "Hormagaunt") {
      this.setState({
				pts: 4,
        wargearPts2: 2,
        abilities: "Instinctive Behaviour, Bounding Leap, Adrenal Glands, Toxin Sacs"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unit.unitType === "Genestealer") {
      this.setState({
				pts: 11,
        wargearPts2: 0,
        abilities: "Lightning Reflexes, Swift and Deadly"
      });
    }
    if (wargearOptions2.value === "Extended Carapace" && this.state.unit.unitType === "Genestealer") {
      this.setState({
				pts: 11,
        wargearPts2: 0,
        abilities: "Lightning Reflexes, Extended Carapace"
      });
    }
    if (wargearOptions2.value === "Toxin Sacs" && this.state.unit.unitType === "Genestealer") {
      this.setState({
				pts: 11,
        wargearPts2: 1,
        abilities: "Lightning Reflexes, Swift and Deadly, Toxin Sacs"
      });
    }
    if (wargearOptions2.value === "Extended Carapace Toxin Sacs" && this.state.unit.unitType === "Genestealer") {
      this.setState({
				pts: 11,
        wargearPts2: 1,
        abilities: "Lightning Reflexes, Extended Carapace, Toxin Sacs"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unit.unitType === "Tyranid Warrior") {
      this.setState({
				pts: 20,
        wargearPts2: 0,
        abilities: "Synapse, Shadow in the Warp"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands" && this.state.unit.unitType === "Tyranid Warrior") {
      this.setState({
				pts: 20,
        wargearPts2: 1,
        abilities: "Synapse, Shadow in the Warp, Adrenal Glands"
      });
    }
    if (wargearOptions2.value === "Toxin Sacs" && this.state.unit.unitType === "Tyranid Warrior") {
      this.setState({
				pts: 20,
        wargearPts2: 1,
        abilities: "Synapse, Shadow in the Warp, Toxin Sacs"
      });
    }
    if (wargearOptions2.value === "flesh hooks" && this.state.unit.unitType === "Tyranid Warrior") {
      this.setState({
				pts: 20,
        wargearPts2: 0,
        abilities: "Synapse, Shadow in the Warp, flesh hooks"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands Toxin Sacs" && this.state.unit.unitType === "Tyranid Warrior") {
      this.setState({
				pts: 20,
        wargearPts2: 2,
        abilities: "Synapse, Shadow in the Warp, Adrenal Glands, Toxin Sacs"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands flesh hooks" && this.state.unit.unitType === "Tyranid Warrior") {
      this.setState({
				pts: 20,
        wargearPts2: 1,
        abilities: "Synapse, Shadow in the Warp, Adrenal Glands, flesh hooks"
      });
    }
    if (wargearOptions2.value === "Toxin Sacs flesh hooks" && this.state.unit.unitType === "Tyranid Warrior") {
      this.setState({
				pts: 20,
        wargearPts2: 1,
        abilities: "Synapse, Shadow in the Warp, Toxin Sacs, flesh hooks"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands Toxin Sacs flesh hooks" && this.state.unit.unitType === "Tyranid Warrior") {
      this.setState({
				pts: 20,
        wargearPts2: 2,
        abilities: "Synapse, Shadow in the Warp, Adrenal Glands, Toxin Sacs, flesh hooks"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
      this.setState({
				pts: 20,
        wargearPts2: 0,
        abilities: "Synapse, Shadow in the Warp"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
      this.setState({
				pts: 20,
        wargearPts2: 1,
        abilities: "Synapse, Shadow in the Warp, Adrenal Glands"
      });
    }
    if (wargearOptions2.value === "Toxin Sacs" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
      this.setState({
				pts: 20,
        wargearPts2: 1,
        abilities: "Synapse, Shadow in the Warp, Toxin Sacs"
      });
    }
    if (wargearOptions2.value === "flesh hooks" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
      this.setState({
				pts: 20,
        wargearPts2: 0,
        abilities: "Synapse, Shadow in the Warp, flesh hooks"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands Toxin Sacs" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
      this.setState({
				pts: 20,
        wargearPts2: 2,
        abilities: "Synapse, Shadow in the Warp, Adrenal Glands, Toxin Sacs"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands flesh hooks" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
      this.setState({
				pts: 20,
        wargearPts2: 1,
        abilities: "Synapse, Shadow in the Warp, Adrenal Glands, flesh hooks"
      });
    }
    if (wargearOptions2.value === "Toxin Sacs flesh hooks" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
      this.setState({
				pts: 20,
        wargearPts2: 1,
        abilities: "Synapse, Shadow in the Warp, Toxin Sacs, flesh hooks"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands Toxin Sacs flesh hooks" && this.state.unit.unitType === "Tyranid Warrior Gunner") {
      this.setState({
				pts: 20,
        wargearPts2: 2,
        abilities: "Synapse, Shadow in the Warp, Adrenal Glands, Toxin Sacs, flesh hooks"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unit.unitType === "Acolyte Hybrid") {
      this.setState({
				pts: 5,
        wargearPts2: 0,
        abilities: "Cult Ambush"
      });
    }
    if (wargearOptions2.value === "Cult Icon" && this.state.unit.unitType === "Acolyte Hybrid") {
      this.setState({
				pts: 5,
        wargearPts2: 5,
        abilities: "Cult Ambush, Cult Icon"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unit.unitType === "Neophyte Hybrid") {
      this.setState({
				pts: 5,
        wargearPts2: 0,
        abilities: "Cult Ambush"
      });
    }
    if (wargearOptions2.value === "Cult Icon" && this.state.unit.unitType === "Neophyte Hybrid") {
      this.setState({
				pts: 5,
        wargearPts2: 5,
        abilities: "Cult Ambush, Cult Icon"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unit.unitType === "Hybrid Metamorph") {
      this.setState({
				pts: 8,
        wargearPts2: 0,
        abilities: "Cult Ambush"
      });
    }
    if (wargearOptions2.value === "Cult Icon" && this.state.unit.unitType === "Hybrid Metamorph") {
      this.setState({
				pts: 8,
        wargearPts2: 5,
        abilities: "Cult Ambush, Cult Icon"
      });
    }
	}			
			

  render() {
		const options3 = [
      {value: 'none', label: 'none', link: 'Tactical Marine Gunner'},
      {value: 'flamer', label: 'flamer +3pts', link: 'Tactical Marine Gunner'},
      {value: 'meltagun', label: 'meltagun +3pts', link: 'Tactical Marine Gunner'},
      {value: 'plasma gun', label: 'plasma gun +3pts', link: 'Tactical Marine Gunner'},
      {value: 'grav-gun', label: 'grav-gun +2pts', link: 'Tactical Marine Gunner'},
      {value: 'missile launcher', label: 'missile launcher +5pts', link: 'Tactical Marine Gunner'},
			{value: 'heavy bolter', label: 'heavy bolter +3pts', link: 'Tactical Marine Gunner'},

			{value: 'none', label: 'none', link: 'Tactical Marine Sergeant'},
      {value: 'combi-flamer', label: 'combi-flamer +3pts', link: 'Tactical Marine Sergeant'},
      {value: 'combi-grav', label: 'combi-grav +2pts', link: 'Tactical Marine Sergeant'},
      {value: 'combi-melta', label: 'combi-melta +3pts', link: 'Tactical Marine Sergeant'},
      {value: 'combi-plasma', label: 'combi-plasma +4pts', link: 'Tactical Marine Sergeant'},
      {value: 'bolt pistol auspex', label: 'bolt pistol and auspex +1pts', link: 'Tactical Marine Sergeant'},
      {value: 'bolt pistol chainsword', label: 'bolt pistol and chainsword +0pts', link: 'Tactical Marine Sergeant'},
      {value: 'bolt pistol power fist', label: 'bolt pistol and power fist +4pts', link: 'Tactical Marine Sergeant'},
      {value: 'bolt pistol power sword', label: 'bolt pistol and power sword +2pts', link: 'Tactical Marine Sergeant'},
      {value: 'plasma pistol auspex', label: 'plasma pistol and auspex +2pts', link: 'Tactical Marine Sergeant'},
      {value: 'plasma pistol chainsword', label: 'plasma pistol and chainsword +1pts', link: 'Tactical Marine Sergeant'},
      {value: 'plasma pistol power fist', label: 'plasma pistol and power fist +5pts', link: 'Tactical Marine Sergeant'},
      {value: 'plasma pistol power sword', label: 'plasma pistol and power sword +3pts', link: 'Tactical Marine Sergeant'},
      {value: 'grav-pistol auspex', label: 'grav-pistol and auspex +2pts', link: 'Tactical Marine Sergeant'},
      {value: 'grav-pistol chainsword', label: 'grav-pistol and chainsword +1pts', link: 'Tactical Marine Sergeant'},
      {value: 'grav-pistol power fist', label: 'grav-pistol and power fist +5pts', link: 'Tactical Marine Sergeant'},
			{value: 'grav-pistol power sword', label: 'grav-pistol and power sword +3pts', link: 'Tactical Marine Sergeant'},
			
			{value: 'none', label: 'none', link: 'Scout'},
			{value: 'combat knife', label: 'combat knife +0pts', link: 'Scout'},
      {value: 'astartes shotgun', label: 'astartes shotgun +0pts', link: 'Scout'},
			{value: 'sniper rifle camo cloak', label: 'sniper rifle and camo cloak +2pts', link: 'Scout'},
			
			{value: 'none', label: 'none', link: 'Scout Gunner'},
			{value: 'heavy bolter', label: 'heavy bolter +3pts', link: 'Scout Gunner'},
      {value: 'missile launcher', label: 'missile launcher +5pts', link: 'Scout Gunner'},
      {value: 'missile launcher camo cloak', label: 'missile launcher and camo cloak +6pts', link: 'Scout Gunner'},
			{value: 'sniper rifle camo cloak', label: 'sniper rifle and camo cloak +2pts', link: 'Scout Gunner'},
			
			{value: 'none', label: 'none', link: 'Scout Sergeant'},
			{value: 'astartes shotgun', label: 'astartes shotgun +0pts', link: 'Scout Sergeant'},
      {value: 'chainsword', label: 'chainsword +0pts', link: 'Scout Sergeant'},
			{value: 'sniper rifle camo cloak', label: 'sniper rifle and camo cloak +2pts', link: 'Scout Sergeant'},
			
			{value: 'none', label: 'none', link: 'Intercessor'},
			{value: 'auto bolt rifle', label: 'auto bolt rifle +0pts', link: 'Intercessor'},
			{value: 'stalker bolt rifle', label: 'stalker bolt rifle +0pts', link: 'Intercessor'},
			
			{value: 'none', label: 'none', link: 'Intercessor Gunner'},
			{value: 'auxiliary grenade launcher', label: 'auxiliary grenade launcher +0pts', link: 'Intercessor Gunner'},

			{value: 'none', label: 'none', link: 'Intercessor Sergeant'},
			{value: 'chainsword', label: 'chainsword +0pts', link: 'Intercessor Sergeant'},
			{value: 'power sword', label: 'power sword +2pts', link: 'Intercessor Sergeant'},
			
			{value: 'none', label: 'none', link: 'Reiver'},
			{value: 'combat knife', label: 'combat knife +0pts', link: 'Reiver'},
			
			{value: 'none', label: 'none', link: 'Reiver Sergeant'},
			{value: 'combat knife', label: 'combat knife +0pts', link: 'Reiver Sergeant'},

			{value: 'none', label: 'none', link: 'Deathwatch Veteran'},
			{value: 'combi-melta', label: 'combi-melta +3pts', link: 'Deathwatch Veteran'},
      {value: 'combi-plasma', label: 'combi-plasma +4pts', link: 'Deathwatch Veteran'},
      {value: 'stalker pattern boltgun', label: 'stalker pattern boltgun +1pts', link: 'Deathwatch Veteran'},
      {value: 'power sword', label: 'power sword +2pts', link: 'Deathwatch Veteran'},
      {value: 'power maul', label: 'power maul +2pts', link: 'Deathwatch Veteran'},
      {value: 'deathwatch shotgun', label: 'deathwatch shotgun +1pts', link: 'Deathwatch Veteran'},
      {value: 'heavy thunder hammer', label: 'heavy thunder hammer +5pts', link: 'Deathwatch Veteran'},
			{value: 'storm shield power sword', label: 'storm shield and power sword +5pts', link: 'Deathwatch Veteran'},
			{value: 'storm shield power maul', label: 'storm shield and power maul +5pts', link: 'Deathwatch Veteran'},
			{value: 'combi-melta power sword', label: 'combi-melta and power sword +5pts', link: 'Deathwatch Veteran'},
      {value: 'combi-plasma power sword', label: 'combi-plasma and power sword +6pts', link: 'Deathwatch Veteran'},
      {value: 'stalker pattern boltgun power sword', label: 'stalker pattern boltgun and power sword +3pts', link: 'Deathwatch Veteran'},
			{value: 'combi-melta power maul', label: 'combi-melta and power maul +5pts', link: 'Deathwatch Veteran'},
      {value: 'combi-plasma power maul', label: 'combi-plasma and power maul +6pts', link: 'Deathwatch Veteran'},
      {value: 'stalker pattern boltgun power maul', label: 'stalker pattern boltgun and power maul +3pts', link: 'Deathwatch Veteran'},

			{value: 'none', label: 'none', link: 'Deathwatch Veteran Gunner'},
			{value: 'combi-melta', label: 'combi-melta +3pts', link: 'Deathwatch Veteran Gunner'},
      {value: 'combi-plasma', label: 'combi-plasma +4pts', link: 'Deathwatch Veteran Gunner'},
      {value: 'stalker pattern boltgun', label: 'stalker pattern boltgun +1pts', link: 'Deathwatch Veteran Gunner'},
      {value: 'power sword', label: 'power sword +2pts', link: 'Deathwatch Veteran Gunner'},
      {value: 'power maul', label: 'power maul +2pts', link: 'Deathwatch Veteran Gunner'},
			{value: 'storm shield power sword', label: 'storm shield and power sword +5pts', link: 'Deathwatch Veteran Gunner'},
			{value: 'storm shield power maul', label: 'storm shield and power maul +5pts', link: 'Deathwatch Veteran Gunner'},
			{value: 'combi-melta power sword', label: 'combi-melta and power sword +5pts', link: 'Deathwatch Veteran Gunner'},
      {value: 'combi-plasma power sword', label: 'combi-plasma and power sword +6pts', link: 'Deathwatch Veteran Gunner'},
      {value: 'stalker pattern boltgun power sword', label: 'stalker pattern boltgun and power sword +3pts', link: 'Deathwatch Veteran Gunner'},
			{value: 'combi-melta power maul', label: 'combi-melta and power maul +5pts', link: 'Deathwatch Veteran Gunner'},
      {value: 'combi-plasma power maul', label: 'combi-plasma and power maul +6pts', link: 'Deathwatch Veteran Gunner'},
      {value: 'stalker pattern boltgun power maul', label: 'stalker pattern boltgun and power maul +3pts', link: 'Deathwatch Veteran Gunner'},
			{value: 'deathwatch frag cannon', label: 'deathwatch frag cannon +5pts', link: 'Deathwatch Veteran Gunner'},
			{value: 'infernus heavy bolter', label: 'infernus heavy bolter +2pts', link: 'Deathwatch Veteran Gunner'},
			
			{value: 'none', label: 'none', link: 'Black Shield'},
			{value: 'combi-melta', label: 'combi-melta +3pts', link: 'Black Shield'},
      {value: 'combi-plasma', label: 'combi-plasma +4pts', link: 'Black Shield'},
      {value: 'stalker pattern boltgun', label: 'stalker pattern boltgun +1pts', link: 'Black Shield'},
      {value: 'power sword', label: 'power sword +2pts', link: 'Black Shield'},
      {value: 'power maul', label: 'power maul +2pts', link: 'Black Shield'},
			{value: 'storm shield power sword', label: 'storm shield and power sword +5pts', link: 'Black Shield'},
			{value: 'storm shield power maul', label: 'storm shield and power maul +5pts', link: 'Black Shield'},
			{value: 'combi-melta power sword', label: 'combi-melta and power sword +5pts', link: 'Black Shield'},
      {value: 'combi-plasma power sword', label: 'combi-plasma and power sword +6pts', link: 'Black Shield'},
      {value: 'stalker pattern boltgun power sword', label: 'stalker pattern boltgun and power sword +3pts', link: 'Black Shield'},
			{value: 'combi-melta power maul', label: 'combi-melta and power maul +5pts', link: 'Black Shield'},
      {value: 'combi-plasma power maul', label: 'combi-plasma and power maul +6pts', link: 'Black Shield'},
      {value: 'stalker pattern boltgun power maul', label: 'stalker pattern boltgun and power maul +3pts', link: 'Black Shield'},
			
			{value: 'none', label: 'none', link: 'Watch Sergeant'},
			{value: 'combi-melta', label: 'combi-melta +3pts', link: 'Watch Sergeant'},
      {value: 'combi-plasma', label: 'combi-plasma +4pts', link: 'Watch Sergeant'},
      {value: 'stalker pattern boltgun', label: 'stalker pattern boltgun +1pts', link: 'Watch Sergeant'},
      {value: 'power sword', label: 'power sword +2pts', link: 'Watch Sergeant'},
      {value: 'power maul', label: 'power maul +2pts', link: 'Watch Sergeant'},
			{value: 'storm shield power sword', label: 'storm shield and power sword +5pts', link: 'Watch Sergeant'},
			{value: 'storm shield power maul', label: 'storm shield and power maul +5pts', link: 'Watch Sergeant'},
			{value: 'combi-melta power sword', label: 'combi-melta and power sword +5pts', link: 'Watch Sergeant'},
      {value: 'combi-plasma power sword', label: 'combi-plasma and power sword +6pts', link: 'Watch Sergeant'},
      {value: 'stalker pattern boltgun power sword', label: 'stalker pattern boltgun and power sword +3pts', link: 'Watch Sergeant'},
			{value: 'combi-melta power maul', label: 'combi-melta and power maul +5pts', link: 'Watch Sergeant'},
      {value: 'combi-plasma power maul', label: 'combi-plasma and power maul +6pts', link: 'Watch Sergeant'},
      {value: 'stalker pattern boltgun power maul', label: 'stalker pattern boltgun and power maul +3pts', link: 'Watch Sergeant'},
			{value: 'xenophase blade', label: 'xenophase blade +3pts', link: 'Watch Sergeant'},
			{value: 'combi-melta xenophase blade', label: 'combi-melta and xenophase blade +6pts', link: 'Watch Sergeant'},
      {value: 'combi-plasma xenophase blade', label: 'combi-plasma and xenophase blade +7pts', link: 'Watch Sergeant'},
      {value: 'stalker pattern boltgun xenophase blade', label: 'stalker pattern boltgun and xenophase blade +4pts', link: 'Watch Sergeant'},
			{value: 'storm shield xenophase blade', label: 'storm shield and xenophase blade +6pts', link: 'Watch Sergeant'},

			{value: 'none', label: 'none', link: 'Grey Knight'},
			{value: 'nemesis force halberd', label: 'nemesis force halberd +0pts', link: 'Grey Knight'},
      {value: 'nemesis daemon hammer', label: 'nemesis daemon hammer +2pts', link: 'Grey Knight'},
      {value: 'nemesis warding stave', label: 'nemesis warding stave +0pts', link: 'Grey Knight'},
			{value: 'two nemesis falchions', label: 'two nemesis falchions +1pts', link: 'Grey Knight'},
			
			{value: 'none', label: 'none', link: 'Grey Knight Gunner'},
			{value: 'incenerator', label: 'incenerator +3pts', link: 'Grey Knight Gunner'},
      {value: 'psilencer', label: 'psilencer +3pts', link: 'Grey Knight Gunner'},
			{value: 'psycannon', label: 'psycannon +2pts', link: 'Grey Knight Gunner'},
			
			{value: 'none', label: 'none', link: 'Justicar'},
			{value: 'nemesis force halberd', label: 'nemesis force halberd +0pts', link: 'Justicar'},
      {value: 'nemesis daemon hammer', label: 'nemesis daemon hammer +2pts', link: 'Justicar'},
      {value: 'nemesis warding stave', label: 'nemesis warding stave +0pts', link: 'Justicar'},
			{value: 'two nemesis falchions', label: 'two nemesis falchions +1pts', link: 'Justicar'},

			{value: 'none', label: 'none', link: 'Guardsman Gunner'},
      {value: 'flamer', label: 'flamer +3pts', link: 'Guardsman Gunner'},
      {value: 'grenade launcher', label: 'grenade launcher +2pts', link: 'Guardsman Gunner'},
      {value: 'meltagun', label: 'meltagun +3pts', link: 'Guardsman Gunner'},
      {value: 'plasma gun', label: 'plasma gun +3pts', link: 'Guardsman Gunner'},
			{value: 'sniper rifle', label: 'sniper rifle +1pts', link: 'Guardsman Gunner'},
			
	    {value: 'none', label: 'none', link: 'Sergeant'},
	    {value: 'bolt pistol', label: 'bolt pistol +0pts', link: 'Sergeant'},
	    {value: 'plasma pistol', label: 'plasma pistol +1pts', link: 'Sergeant'},
	    {value: 'power sword', label: 'power sword +1pts', link: 'Sergeant'},
	    {value: 'bolt pistol power sword', label: 'bolt pistol and power sword +1pts', link: 'Sergeant'},
			{value: 'plasma pistol power sword', label: 'plasma pistol and power sword +2pts', link: 'Sergeant'},

			{value: 'none', label: 'none', link: 'Special Weapons Guardsman'},

			{value: 'none', label: 'none', link: 'Special Weapons Gunner'},
      {value: 'flamer', label: 'flamer +3pts', link: 'Special Weapons Gunner'},
      {value: 'grenade launcher', label: 'grenade launcher +2pts', link: 'Special Weapons Gunner'},
      {value: 'meltagun', label: 'meltagun +3pts', link: 'Special Weapons Gunner'},
      {value: 'plasma gun', label: 'plasma gun +3pts', link: 'Special Weapons Gunner'},
			{value: 'sniper rifle', label: 'sniper rifle +1pts', link: 'Special Weapons Gunner'},

			{value: 'none', label: 'none', link: 'Scion Gunner'},
			{value: 'flamer', label: 'flamer +3pts', link: 'Scion Gunner'},
      {value: 'meltagun', label: 'meltagun +3pts', link: 'Scion Gunner'},
      {value: 'plasma gun', label: 'plasma gun +3pts', link: 'Scion Gunner'},
			{value: 'hot-shot volley gun', label: 'hot-shot volley gun +3pts', link: 'Scion Gunner'},

	    {value: 'none', label: 'none', link: 'Tempestor'},
	    {value: 'bolt pistol', label: 'bolt pistol +0pts', link: 'Tempestor'},
	    {value: 'plasma pistol', label: 'plasma pistol +1pts', link: 'Tempestor'},
	    {value: 'power sword', label: 'power sword +1pts', link: 'Tempestor'},
	    {value: 'power fist', label: 'power fist +2pts', link: 'Tempestor'},
	    {value: 'bolt pistol power sword', label: 'bolt pistol and power sword +1pts', link: 'Tempestor'},
			{value: 'plasma pistol power sword', label: 'plasma pistol and power sword +2pts', link: 'Tempestor'},
	    {value: 'bolt pistol power fist', label: 'bolt pistol and power fist +2pts', link: 'Tempestor'},
			{value: 'plasma pistol power fist', label: 'plasma pistol and power fist +3pts', link: 'Tempestor'},

			{value: 'none', label: 'none', link: 'Ranger Gunner'},
			{value: 'arc rifle', label: 'arc rifle +0pts', link: 'Ranger Gunner'},
			{value: 'plasma caliver', label: 'plasma caliver +3pts', link: 'Ranger Gunner'},
			{value: 'transuranic arquebus', label: 'transuranic arquebus +5pts', link: 'Ranger Gunner'},

			{value: 'none', label: 'none', link: 'Ranger Alpha'},
			{value: 'arc pistol arc maul', label: 'arc pistol and arc maul +0pts', link: 'Ranger Alpha'},
			{value: 'arc pistol power sword', label: 'arc pistol and power sword +0pts', link: 'Ranger Alpha'},
			{value: 'arc pistol taser goad', label: 'arc pistol and taser goad +1pts', link: 'Ranger Alpha'},
			{value: 'radium pistol arc maul', label: 'radium pistol and arc maul +0pts', link: 'Ranger Alpha'},
			{value: 'radium pistol power sword', label: 'radium pistol and power sword +0pts', link: 'Ranger Alpha'},
			{value: 'radium pistol taser goad', label: 'radium pistol and taser goad +1pts', link: 'Ranger Alpha'},
			{value: 'phosphor blast pistol arc maul', label: 'phosphor blast pistol and arc maul +0pts', link: 'Ranger Alpha'},
			{value: 'phosphor blast pistol power sword', label: 'phosphor blast pistol and power sword +0pts', link: 'Ranger Alpha'},
			{value: 'phosphor blast pistol taser goad', label: 'phosphor blast pistol and taser goad +1pts', link: 'Ranger Alpha'},

			{value: 'none', label: 'none', link: 'Vanguard Gunner'},
			{value: 'arc rifle', label: 'arc rifle +0pts', link: 'Vanguard Gunner'},
			{value: 'plasma caliver', label: 'plasma caliver +3pts', link: 'Vanguard Gunner'},
			{value: 'transuranic arquebus', label: 'transuranic arquebus +5pts', link: 'Vanguard Gunner'},

			{value: 'none', label: 'none', link: 'Vanguard Alpha'},
			{value: 'arc pistol arc maul', label: 'arc pistol and arc maul +0pts', link: 'Vanguard Alpha'},
			{value: 'arc pistol power sword', label: 'arc pistol and power sword +0pts', link: 'Vanguard Alpha'},
			{value: 'arc pistol taser goad', label: 'arc pistol and taser goad +1pts', link: 'Vanguard Alpha'},
			{value: 'radium pistol arc maul', label: 'radium pistol and arc maul +0pts', link: 'Vanguard Alpha'},
			{value: 'radium pistol power sword', label: 'radium pistol and power sword +0pts', link: 'Vanguard Alpha'},
			{value: 'radium pistol taser goad', label: 'radium pistol and taser goad +1pts', link: 'Vanguard Alpha'},
			{value: 'phosphor blast pistol arc maul', label: 'phosphor blast pistol and arc maul +0pts', link: 'Vanguard Alpha'},
			{value: 'phosphor blast pistol power sword', label: 'phosphor blast pistol and power sword +0pts', link: 'Vanguard Alpha'},
			{value: 'phosphor blast pistol taser goad', label: 'phosphor blast pistol and taser goad +1pts', link: 'Vanguard Alpha'},

			{value: 'none', label: 'none', link: 'Sicarian Ruststalker'},
			{value: 'transonic blades', label: 'transonic blades +0pts', link: 'Sicarian Ruststalker'},

			{value: 'none', label: 'none', link: 'Ruststalker Princeps'},
			{value: 'transonic blades', label: 'transonic blades +0pts', link: 'Ruststalker Princeps'},

			{value: 'none', label: 'none', link: 'Sicarian Infiltrator'},
			{value: 'flechette blaster taser goad', label: 'flechette blaster and taser goad +1pts', link: 'Sicarian Infiltrator'},

			{value: 'none', label: 'none', link: 'Infiltrator Princeps'},
			{value: 'flechette blaster taser goad', label: 'flechette blaster and taser goad +1pts', link: 'Infiltrator Princeps'},

			{value: 'none', label: 'none', link: 'Chaos Cultist'},
			{value: 'brutal assault weapon autopistol', label: 'brutal assault weapon and autopistol +0pts', link: 'Chaos Cultist'},

			{value: 'none', label: 'none', link: 'Chaos Cultist Gunner'},
			{value: 'flamer', label: 'flamer +3pts', link: 'Chaos Cultist Gunner'},
			{value: 'heavy stubber', label: 'heavy stubber +0pts', link: 'Chaos Cultist Gunner'},

			{value: 'none', label: 'none', link: 'Cultist Champion'},
			{value: 'shotgun', label: 'shotgun +0pts', link: 'Cultist Champion'},
			{value: 'brutal assault weapon autopistol', label: 'brutal assault weapon and autopistol +0pts', link: 'Cultist Champion'},

			{value: 'none', label: 'none', link: 'Chaos Space Marine'},
			{value: 'chainsword', label: 'chainsword +0pts', link: 'Chaos Space Marine'},

			{value: 'none', label: 'none', link: 'Chaos Space Marine Gunner'},
			{value: 'flamer', label: 'flamer +3pts', link: 'Chaos Space Marine Gunner'},
			{value: 'meltagun', label: 'meltagun +3pts', link: 'Chaos Space Marine Gunner'},
			{value: 'plasma gun', label: 'plasma gun +3pts', link: 'Chaos Space Marine Gunner'},
			{value: 'heavy bolter', label: 'heavy bolter +3pts', link: 'Chaos Space Marine Gunner'},

			{value: 'none', label: 'none', link: 'Aspiring Champion'},
      {value: 'bolt pistol chainsword', label: 'bolt pistol and chainsword +0pts', link: 'Aspiring Champion'},
      {value: 'bolt pistol power fist', label: 'bolt pistol and power fist +4pts', link: 'Aspiring Champion'},
      {value: 'bolt pistol power sword', label: 'bolt pistol and power sword +2pts', link: 'Aspiring Champion'},
      {value: 'plasma pistol chainsword', label: 'plasma pistol and chainsword +1pts', link: 'Aspiring Champion'},
      {value: 'plasma pistol power fist', label: 'plasma pistol and power fist +5pts', link: 'Aspiring Champion'},
			{value: 'plasma pistol power sword', label: 'plasma pistol and power sword +3pts', link: 'Aspiring Champion'},

			{value: 'none', label: 'none', link: 'Plague Marine Gunner'},
			{value: 'blight launcher', label: 'blight launcher +3pts', link: 'Plague Marine Gunner'},
			{value: 'meltagun', label: 'meltagun +3pts', link: 'Plague Marine Gunner'},
			{value: 'plague spewer', label: 'plague spewer +4pts', link: 'Plague Marine Gunner'},
			{value: 'plague belcher', label: 'plague belcher +3pts', link: 'Plague Marine Gunner'},
			{value: 'plasma gun', label: 'plasma gun +3pts', link: 'Plague Marine Gunner'},

			{value: 'none', label: 'none', link: 'Plague Marine Fighter'},
			{value: 'bubotic axe', label: 'bubotic axe +2pts', link: 'Plague Marine Fighter'},
			{value: 'great plague cleaver', label: 'great plague cleaver +4pts', link: 'Plague Marine Fighter'},
			{value: 'flail of corruption', label: 'flail of corruption +4pts', link: 'Plague Marine Fighter'},
			{value: 'second plague knife', label: 'second plague knife +0pts', link: 'Plague Marine Fighter'},
			{value: 'mace of contagion bubotic axe', label: 'mace of contagion and bubotic axe +5pts', link: 'Plague Marine Fighter'},

			{value: 'none', label: 'none', link: 'Plague Champion'},
			{value: 'plaguesword', label: 'plaguesword +0pts', link: 'Plague Champion'},
			{value: 'bolt pistol', label: 'bolt pistol +0pts', link: 'Plague Champion'},
			{value: 'plasma pistol', label: 'plasma pistol +1pts', link: 'Plague Champion'},
			{value: 'plasma gun', label: 'plasma gun +3pts', link: 'Plague Champion'},
			{value: 'power fist', label: 'power fist +4pts', link: 'Plague Champion'},
			{value: 'plaguesword bolt pistol', label: 'plaguesword and bolt pistol +0pts', link: 'Plague Champion'},
			{value: 'plaguesword plasma pistol', label: 'plaguesword and plasma pistol +1pts', link: 'Plague Champion'},
			{value: 'plaguesword plasma gun', label: 'plaguesword and plasma gun +3pts', link: 'Plague Champion'},
			{value: 'power fist bolt pistol', label: 'power fist and bolt pistol +4pts', link: 'Plague Champion'},
			{value: 'power fist plasma pistol', label: 'power fist and plasma pistol +5pts', link: 'Plague Champion'},
			{value: 'power fist plasma gun', label: 'power fist and plasma gun +7pts', link: 'Plague Champion'},

			{value: 'none', label: 'none', link: 'Rubric Marine'},
			{value: 'Icon of Flame', label: 'Icon of Flame +1pts', link: 'Rubric Marine'},
			{value: 'warpflamer', label: 'warpflamer +4pts', link: 'Rubric Marine'},
			
			{value: 'none', label: 'none', link: 'Rubric Marine Gunner'},
			{value: 'soulreaper cannon', label: 'soulreaper cannon +4pts', link: 'Rubric Marine Gunner'},
			
			{value: 'none', label: 'none', link: 'Aspiring Sorcerer'},
			{value: 'warpflame pistol', label: 'warpflame pistol +1pts', link: 'Aspiring Sorcerer'},
			
			{value: 'none', label: 'none', link: 'Tzaangor'},
			{value: 'autopistol chainsword', label: 'autopistol and chainsword +0pts', link: 'Tzaangor'},
			
			{value: 'none', label: 'none', link: 'Heavy Weapon Platform'},
			{value: 'aeldari missile launcher', label: 'aeldari missile launcher +5pts', link: 'Heavy Weapon Platform'},
			{value: 'bright lance', label: 'bright lance +4pts', link: 'Heavy Weapon Platform'},
			{value: 'scatter laser', label: 'scatter laser +2pts', link: 'Heavy Weapon Platform'},
			{value: 'starcannon', label: 'starcannon +3pts', link: 'Heavy Weapon Platform'},
			
			{value: 'none', label: 'none', link: 'Storm Guardian'},
			{value: 'chainsword', label: 'chainsword +0pts', link: 'Storm Guardian'},
			
			{value: 'none', label: 'none', link: 'Storm Guardian Gunner'},
			{value: 'flamer', label: 'flamer +3pts', link: 'Storm Guardian Gunner'},
			{value: 'fusion gun', label: 'fusion gun +3pts', link: 'Storm Guardian Gunner'},
			
			{value: 'none', label: 'none', link: 'Dire Avenger Exarch'},
			{value: 'two avenger shuriken catapults', label: 'two avenger shuriken catapults +0pts', link: 'Dire Avenger Exarch'},
			{value: 'shuriken pistol power glaive', label: 'shuriken pistol and power glaive +1pts', link: 'Dire Avenger Exarch'},
			{value: 'shuriken pistol diresword', label: 'shuriken pistol and diresword +2pts', link: 'Dire Avenger Exarch'},
			{value: 'shimmershield power glaive', label: 'shimmershield and power glaive +5pts', link: 'Dire Avenger Exarch'},
			
      {value: 'none', label: 'none', link: 'Kabalite Gunner'},
			{value: 'splinter cannon', label: 'splinter cannon +0pts', link: 'Kabalite Gunner'},
			{value: 'dark lance', label: 'dark lance +4pts', link: 'Kabalite Gunner'},
			{value: 'shredder', label: 'shredder +1pts', link: 'Kabalite Gunner'},
			{value: 'blaster', label: 'blaster +3pts', link: 'Kabalite Gunner'},
			
      {value: 'none', label: 'none', link: 'Sybarite'},
			{value: 'power sword', label: 'power sword +2pts', link: 'Sybarite'},
			{value: 'agonizer', label: 'agonizer +2pts', link: 'Sybarite'},
			{value: 'phantasm grenade launcher', label: 'phantasm grenade launcher +1pts', link: 'Sybarite'},
			{value: 'splinter pistol', label: 'splinter pistol +0pts', link: 'Sybarite'},
			{value: 'blast pistol', label: 'blast pistol +2pts', link: 'Sybarite'},
			{value: 'power sword phantasm grenade launcher', label: 'power sword and phantasm grenade launcher +3pts', link: 'Sybarite'},
			{value: 'power sword blast pistol', label: 'agonizer and phantasm grenade launcher +3pts', link: 'Sybarite'},
			{value: 'power sword blast pistol', label: 'power sword and blast pistol +4pts', link: 'Sybarite'},
			{value: 'agonizer blast pistol', label: 'agonizer and blast pistol +4pts', link: 'Sybarite'},
			{value: 'power sword splinter pistol', label: 'power sword and splinter pistol +2pts', link: 'Sybarite'},
			{value: 'agonizer splinter pistol', label: 'agonizer and splinter pistol +2pts', link: 'Sybarite'},
			{value: 'power sword splinter pistol phantasm grenade launcher', label: 'power sword, splinter pistol, and phantasm grenade launcher +3pts', link: 'Sybarite'},
			{value: 'agonizer splinter pistol phantasm grenade launcher', label: 'agonizer, splinter pistol, and phantasm grenade launcher +3pts', link: 'Sybarite'},
			{value: 'power sword blast pistol phantasm grenade launcher', label: 'power sword, blast pistol, and phantasm grenade launcher +5pts', link: 'Sybarite'},
			{value: 'agonizer blast pistol phantasm grenade launcher', label: 'agonizer, blast pistol, and phantasm grenade launcher +5pts', link: 'Sybarite'},
			
      {value: 'none', label: 'none', link: 'Wych Fighter'},
			{value: 'hydra gauntlets', label: 'hydra gauntlets +2pts', link: 'Wych Fighter'},
			{value: 'razorflails', label: 'razorflails +2pts', link: 'Wych Fighter'},
			{value: 'shardnet and impaler', label: 'shardnet and impaler +2pts', link: 'Wych Fighter'},
			
      {value: 'none', label: 'none', link: 'Hekatrix'},
			{value: 'power sword', label: 'power sword +2pts', link: 'Hekatrix'},
			{value: 'agonizer', label: 'agonizer +2pts', link: 'Hekatrix'},
			{value: 'blast pistol', label: 'blast pistol +2pts', link: 'Hekatrix'},
			{value: 'power sword blast pistol', label: 'power sword and blast pistol +4pts', link: 'Hekatrix'},
			{value: 'agonizer blast pistol', label: 'agonizer and blast pistol +4pts', link: 'Hekatrix'},
      {value: 'phantasm grenade launcher', label: 'phantasm grenade launcher +1pts', link: 'Hekatrix'},
      {value: 'power sword phantasm grenade launcher', label: 'power sword phantasm grenade launcher +3pts', link: 'Hekatrix'},
      {value: 'agonizer phantasm grenade launcher', label: 'agonizer phantasm grenade launcher +3pts', link: 'Hekatrix'},
			{value: 'power sword blast pistol phantasm grenade launcher', label: 'power sword, blast pistol, and phantasm grenade launcher +5pts', link: 'Hekatrix'},
			{value: 'agonizer blast pistol phantasm grenade launcher', label: 'agonizer, blast pistol, and phantasm grenade launcher +5pts', link: 'Hekatrix'},
			
			{value: 'none', label: 'none', link: 'Player'},
			{value: 'neuro disruptor', label: 'neuro disruptor +2pts', link: 'Player'},
      {value: 'fusion pistol', label: 'fusion pistol +3pts', link: 'Player'},
      {value: "harlequin's caress", label: "harlequin's caress +3pts", link: "Player"},
      {value: "harlequin's embrace", label: "harlequin's embrace +2pts", link: "Player"},
      {value: "harlequin's kiss", label: "harlequin's kiss +4pts", link: "Player"},
      {value: "neuro disruptor harlequin's caress", label: "neuro disruptor and harlequin's caress +5pts", link: "Player"},
      {value: "neuro disruptor harlequin's embrace", label: "neuro disruptor and harlequin's embrace +4pts", link: "Player"},
      {value: "neuro disruptor harlequin's kiss", label: "neuro disruptor and harlequin's kiss +6pts", link: "Player"},
      {value: "fusion pistol harlequin's caress", label: "fusion pistol and harlequin's caress +6pts", link: "Player"},
      {value: "fusion pistol harlequin's embrace", label: "fusion pistol and harlequin's embrace +5pts", link: "Player"},
			{value: "fusion pistol harlequin's kiss", label: "fusion pistol and harlequin's kiss +7pts", link: "Player"},
			
			{value: 'none', label: 'none', link: 'Immortal'},
			{value: 'tesla carbine', label: 'tesla carbine +0pts', link: 'Immortal'},
			
			{value: 'none', label: 'none', link: 'Ork Boy'},
			{value: 'shoota', label: 'shoota +0pts', link: 'Ork Boy'},
			
			{value: 'none', label: 'none', link: 'Ork Boy Gunner'},
			{value: 'big shoota', label: 'big shoota +0pts', link: 'Ork Boy Gunner'},
			{value: 'rokkit launcha', label: 'rokkit launcha +3pts', link: 'Ork Boy Gunner'},
			
			{value: 'none', label: 'none', link: 'Boss Nob'},
			{value: 'big choppa', label: 'big choppa +2pts', link: 'Boss Nob'},
			{value: 'power klaw', label: 'power klaw +4pts', link: 'Boss Nob'},
			{value: 'kombi-weapon with rokkit launcha', label: 'kombi-weapon with rokkit launcha +3pts', link: 'Boss Nob'},
			{value: 'big choppa kombi-weapon with rokkit launcha', label: 'big choppa and kombi-weapon with rokkit launcha +5pts', link: 'Boss Nob'},
			{value: 'kombi-weapon with skorcha', label: 'kombi-weapon with skorcha +4pts', link: 'Boss Nob'},
			{value: 'big choppa kombi-weapon with skorcha', label: 'big choppa and kombi-weapon with skorcha +6pts', link: 'Boss Nob'},
			{value: 'power klaw kombi-weapon with rokkit launcha', label: 'power klaw and kombi-weapon with rokkit launcha +7pts', link: 'Boss Nob'},
			{value: 'power klaw kombi-weapon with skorcha', label: 'power klaw and kombi-weapon with skorcha +8pts', link: 'Boss Nob'},
			
			{value: 'none', label: 'none', link: 'Kommando Boss Nob'},
			{value: 'power klaw', label: 'power klaw +4pts', link: 'Kommando Boss Nob'},
			
			{value: 'none', label: 'none', link: 'Burna Spanner'},
			{value: 'kustom mega-blasta', label: 'kustom mega-blasta +0pts', link: 'Burna Spanner'},
			{value: 'rokkit launcha', label: 'rokkit launcha +3pts', link: 'Burna Spanner'},
			
			{value: 'none', label: 'none', link: 'Loota Spanner'},
			{value: 'kustom mega-blasta', label: 'kustom mega-blasta +0pts', link: 'Loota Spanner'},
			{value: 'rokkit launcha', label: 'rokkit launcha +3pts', link: 'Loota Spanner'},
			
			{value: 'none', label: 'none', link: 'Shasla'},
			{value: 'pulse carbine', label: 'pulse carbine +0pts', link: 'Shasla'},
			{value: 'pulse pistol', label: 'pulse pistol +0pts', link: 'Shasla'},
			
			{value: 'none', label: 'none', link: 'Shasui'},
			{value: 'pulse carbine', label: 'pulse carbine +0pts', link: 'Shasui'},
			{value: 'pulse pistol', label: 'pulse pistol +0pts', link: 'Shasui'},
			{value: 'markerlight', label: 'markerlight +0pts', link: 'Shasui'},
			{value: 'pulse carbine markerlight', label: 'pulse carbine and markerlight +0pts', link: 'Shasui'},
			{value: 'pulse pistol markerlight', label: 'pulse pistol and markerlight +0pts', link: 'Shasui'},
			
			{value: 'none', label: 'none', link: 'Pathfinder Gunner'},
			{value: 'ion rifle', label: 'ion rifle +3pts', link: 'Pathfinder Gunner'},
			{value: 'rail rifle', label: 'rail rifle +5pts', link: 'Pathfinder Gunner'},
			
			{value: 'none', label: 'none', link: 'Pathfinder Shasui'},
			{value: 'pulse pistol', label: 'pulse pistol +0pts', link: 'Pathfinder Shasui'},
			
			{value: 'none', label: 'none', link: 'Breacher Shasla'},
			{value: 'pulse pistol', label: 'pulse pistol +0pts', link: 'Breacher Shasla'},
			
			{value: 'none', label: 'none', link: 'Breacher Shasui'},
			{value: 'pulse pistol', label: 'pulse pistol +0pts', link: 'Breacher Shasui'},
			{value: 'markerlight', label: 'markerlight +0pts', link: 'Breacher Shasui'},
			{value: 'pulse pistol markerlight', label: 'pulse pistol and markerlight +0pts', link: 'Breacher Shasui'},
			
			{value: 'none', label: 'none', link: 'Stealth Shasui'},
			{value: 'fusion blaster', label: 'fusion blaster +4pts', link: 'Stealth Shasui'},
			
			{value: 'none', label: 'none', link: 'Stealth Shasvre'},
			{value: 'fusion blaster', label: 'fusion blaster +4pts', link: 'Stealth Shasvre'},
			{value: 'markerlight and target lock', label: 'markerlight and target lock +1pts', link: 'Stealth Shasvre'},
			{value: 'fusion blaster markerlight and target lock', label: 'fusion blaster, markerlight, and target lock +5pts', link: 'Stealth Shasvre'},
			
			{value: 'none', label: 'none', link: 'Termagant'},
			{value: 'devourer', label: 'devourer +3pts', link: 'Termagant'},
			{value: 'spinefists', label: 'spinefists +0pts', link: 'Termagant'},
			
			{value: 'none', label: 'none', link: 'Tyranid Warrior'},
			{value: 'rending claws', label: 'rending claws +0pts', link: 'Tyranid Warrior'},
			{value: 'boneswords', label: 'boneswords +0pts', link: 'Tyranid Warrior'},
			{value: 'lash whip and bonesword', label: 'lash whip and bonesword +1pts', link: 'Tyranid Warrior'},
			{value: 'deathspitter', label: 'deathspitter +2pts', link: 'Tyranid Warrior'},
			{value: 'rending claws deathspitter', label: 'rending claws and deathspitter +2pts', link: 'Tyranid Warrior'},
			{value: 'boneswords deathspitter', label: 'boneswords and deathspitter +2pts', link: 'Tyranid Warrior'},
			{value: 'lash whip and bonesword deathspitter', label: 'lash whip and bonesword and deathspitter +3pts', link: 'Tyranid Warrior'},
			{value: 'spinefists', label: 'spinefists +0pts', link: 'Tyranid Warrior'},
			{value: 'rending claws spinefists', label: 'rending claws and spinefists +1pts', link: 'Tyranid Warrior'},
			{value: 'boneswords spinefists', label: 'boneswords and spinefists +0pts', link: 'Tyranid Warrior'},
			{value: 'lash whip and bonesword spinefists', label: 'lash whip and bonesword and spinefists +1pts', link: 'Tyranid Warrior'},
			{value: 'rending claws x2', label: 'rending claws x2 +0pts', link: 'Tyranid Warrior'},
			{value: 'scything talons rending claws', label: 'scything talons and rending claws +0pts', link: 'Tyranid Warrior'},
			{value: 'boneswords rending claws', label: 'boneswords and rending claws +0pts', link: 'Tyranid Warrior'},
			{value: 'lash whip and bonesword rending claws', label: 'lash whip and bonesword and rending claws +1pts', link: 'Tyranid Warrior'},
			{value: 'scything talons x2', label: 'scything talons x2 +0pts', link: 'Tyranid Warrior'},
			{value: 'boneswords scything talons', label: 'boneswords and scything talons +0pts', link: 'Tyranid Warrior'},
			{value: 'lash whip and bonesword scything talons', label: 'lash whip and bonesword and scything talons +1pts', link: 'Tyranid Warrior'},
			{value: 'boneswords x2', label: 'boneswords x2 +0pts', link: 'Tyranid Warrior'},
			{value: 'boneswords lash whip and bonesword', label: 'boneswords, lash whip and bonesword +1pts', link: 'Tyranid Warrior'},
			{value: 'lash whip and bonesword x2', label: 'lash whip and bonesword x2 +2pts', link: 'Tyranid Warrior'},
			
			{value: 'none', label: 'none', link: 'Tyranid Warrior Gunner'},
			{value: 'rending claws', label: 'rending claws +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'boneswords', label: 'boneswords +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'lash whip and bonesword', label: 'lash whip and bonesword +1pts', link: 'Tyranid Warrior Gunner'},
			{value: 'deathspitter', label: 'deathspitter +2pts', link: 'Tyranid Warrior Gunner'},
			{value: 'rending claws deathspitter', label: 'rending claws and deathspitter +2pts', link: 'Tyranid Warrior Gunner'},
			{value: 'boneswords deathspitter', label: 'boneswords and deathspitter +2pts', link: 'Tyranid Warrior Gunner'},
			{value: 'lash whip and bonesword deathspitter', label: 'lash whip and bonesword and deathspitter +3pts', link: 'Tyranid Warrior Gunner'},
			{value: 'spinefists', label: 'spinefists +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'rending claws spinefists', label: 'rending claws and spinefists +1pts', link: 'Tyranid Warrior Gunner'},
			{value: 'boneswords spinefists', label: 'boneswords and spinefists +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'lash whip and bonesword spinefists', label: 'lash whip and bonesword and spinefists +1pts', link: 'Tyranid Warrior Gunner'},
			{value: 'rending claws x2', label: 'rending claws x2 +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'scything talons rending claws', label: 'scything talons and rending claws +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'boneswords rending claws', label: 'boneswords and rending claws +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'lash whip and bonesword rending claws', label: 'lash whip and bonesword and rending claws +1pts', link: 'Tyranid Warrior Gunner'},
			{value: 'scything talons x2', label: 'scything talons x2 +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'boneswords scything talons', label: 'boneswords and scything talons +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'lash whip and bonesword scything talons', label: 'lash whip and bonesword and scything talons +1pts', link: 'Tyranid Warrior Gunner'},
			{value: 'boneswords x2', label: 'boneswords x2 +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'boneswords lash whip and bonesword', label: 'boneswords, lash whip and bonesword +1pts', link: 'Tyranid Warrior Gunner'},
			{value: 'lash whip and bonesword x2', label: 'lash whip and bonesword x2 +2pts', link: 'Tyranid Warrior Gunner'},
			{value: 'barbed strangler', label: 'barbed strangler +3pts', link: 'Tyranid Warrior Gunner'},
			{value: 'rending claws barbed strangler', label: 'rending claws and barbed strangler +3pts', link: 'Tyranid Warrior Gunner'},
			{value: 'boneswords barbed strangler', label: 'boneswords and barbed strangler +3pts', link: 'Tyranid Warrior Gunner'},
			{value: 'lash whip and bonesword barbed strangler', label: 'lash whip and bonesword, barbed strangler +4pts', link: 'Tyranid Warrior Gunner'},
			{value: 'venom cannon', label: 'venom cannon +4pts', link: 'Tyranid Warrior Gunner'},
			{value: 'rending claws venom cannon', label: 'rending claws and venom cannon +4pts', link: 'Tyranid Warrior Gunner'},
			{value: 'boneswords venom cannon', label: 'boneswords and venom cannon +4pts', link: 'Tyranid Warrior Gunner'},
			{value: 'lash whip and bonesword venom cannon', label: 'lash whip and bonesword, venom cannon +5pts', link: 'Tyranid Warrior Gunner'},
			
			{value: 'none', label: 'none', link: 'Genestealer'},
			{value: 'scything talons', label: 'scything talons +0pts', link: 'Genestealer'},
			{value: 'flesh hooks', label: 'flesh hooks +0pts', link: 'Genestealer'},
			{value: 'scything talons flesh hooks', label: 'scything talons and flesh hooks +0pts', link: 'Genestealer'},
			{value: 'acid maw', label: 'acid maw +0pts', link: 'Genestealer'},
			{value: 'scything talons acid maw', label: 'scything talons and acid maw +0pts', link: 'Genestealer'},
			
			{value: 'none', label: 'none', link: 'Acolyte Hybrid'},
			{value: 'hand flamer', label: 'hand flamer +2pts', link: 'Acolyte Hybrid'},
      
			{value: 'none', label: 'none', link: 'Acolyte Hybrid Fighter'},
			{value: 'hand flamer', label: 'hand flamer +2pts', link: 'Acolyte Hybrid Fighter'},
			{value: 'heavy rock drill', label: 'heavy rock drill +5pts', link: 'Acolyte Hybrid Fighter'},
			{value: 'heavy rock saw', label: 'heavy rock saw +4pts', link: 'Acolyte Hybrid Fighter'},
			{value: 'heavy rock cutter', label: 'heavy rock cutter +4pts', link: 'Acolyte Hybrid Fighter'},
			{value: 'demolition charges', label: 'demolition charges +3pts', link: 'Acolyte Hybrid Fighter'},
			{value: 'hand flamer heavy rock drill', label: 'hand flamer and heavy rock drill +7pts', link: 'Acolyte Hybrid Fighter'},
			{value: 'hand flamer heavy rock saw', label: 'hand flamer and heavy rock saw +6pts', link: 'Acolyte Hybrid Fighter'},
			{value: 'hand flamer heavy rock cutter', label: 'hand flamer and heavy rock cutter +6pts', link: 'Acolyte Hybrid Fighter'},
			{value: 'hand flamer demolition charges', label: 'hand flamer and demolition charges +5pts', link: 'Acolyte Hybrid Fighter'},
			
			{value: 'none', label: 'none', link: 'Acolyte Leader'},
			{value: 'hand flamer', label: 'hand flamer +2pts', link: 'Acolyte Leader'},
			{value: 'bonesword', label: 'bonesword +1pts', link: 'Acolyte Leader'},
			{value: 'lash whip and bonesword', label: 'lash whip and bonesword +2pts', link: 'Acolyte Leader'},
			
			{value: 'none', label: 'none', link: 'Aberrant'},
			{value: 'power hammer', label: 'power hammer +4pts', link: 'Aberrant'},
			
			{value: 'none', label: 'none', link: 'Neophyte Hybrid'},
			{value: 'shotgun', label: 'shotgun +0pts', link: 'Neophyte Hybrid'},
			
			{value: 'none', label: 'none', link: 'Neophyte Gunner'},
			{value: 'shotgun', label: 'shotgun +0pts', link: 'Neophyte Gunner'},
			{value: 'flamer', label: 'flamer +3pts', link: 'Neophyte Gunner'},
			{value: 'grenade launcher', label: 'grenade launcher +2pts', link: 'Neophyte Gunner'},
			{value: 'webber', label: 'webber +1pts', link: 'Neophyte Gunner'},
			{value: 'heavy stubber', label: 'heavy stubber +0pts', link: 'Neophyte Gunner'},
			{value: 'mining laser', label: 'mining laser +3pts', link: 'Neophyte Gunner'},
			{value: 'seismic cannon', label: 'seismic cannon +2pts', link: 'Neophyte Gunner'},
			
			{value: 'none', label: 'none', link: 'Neophyte Leader'},
			{value: 'shotgun', label: 'shotgun +0pts', link: 'Neophyte Leader'},
			{value: 'autopistol chainsword', label: 'autopistol and chainsword +0pts', link: 'Neophyte Leader'},
			{value: 'autopistol power maul', label: 'autopistol and power maul +1pts', link: 'Neophyte Leader'},
			{value: 'autopistol power pick', label: 'autopistol and power pick +3pts', link: 'Neophyte Leader'},
			{value: 'bolt pistol chainsword', label: 'bolt pistol and chainsword +0pts', link: 'Neophyte Leader'},
			{value: 'bolt Pistol power maul', label: 'bolt Pistol and power maul +1pts', link: 'Neophyte Leader'},
			{value: 'bolt pistol power pick', label: 'bolt pistol and power pick +3pts', link: 'Neophyte Leader'},
			{value: 'web pistol chainsword', label: 'web pistol and chainsword +0pts', link: 'Neophyte Leader'},
			{value: 'web pistol power maul', label: 'web pistol and power maul +1pts', link: 'Neophyte Leader'},
			{value: 'web pistol power pick', label: 'web pistol and power pick +3pts', link: 'Neophyte Leader'},
			
			{value: 'none', label: 'none', link: 'Hybrid Metamorph'},
			{value: 'metamorph talon', label: 'metamorph talon +0pts', link: 'Hybrid Metamorph'},
			{value: 'metamorph whip', label: 'metamorph whip +1pts', link: 'Hybrid Metamorph'},
			{value: 'metamorph claw', label: 'metamorph claw +1pts', link: 'Hybrid Metamorph'},
			{value: 'hand flamer metamorph talon', label: 'hand flamer and metamorph talon +2pts', link: 'Hybrid Metamorph'},
			{value: 'hand flamer metamorph whip', label: 'hand flamer and metamorph whip +3pts', link: 'Hybrid Metamorph'},
			{value: 'hand flamer metamorph claw', label: 'hand flamer and metamorph claw +3pts', link: 'Hybrid Metamorph'},
			
			{value: 'none', label: 'none', link: 'Metamorph Leader'},
			{value: 'metamorph talon', label: 'metamorph talon +0pts', link: 'Metamorph Leader'},
			{value: 'metamorph whip', label: 'metamorph whip +1pts', link: 'Metamorph Leader'},
			{value: 'metamorph claw', label: 'metamorph claw +1pts', link: 'Metamorph Leader'},
			{value: 'hand flamer metamorph talon', label: 'hand flamer and metamorph talon +2pts', link: 'Metamorph Leader'},
			{value: 'hand flamer metamorph whip', label: 'hand flamer and metamorph whip +3pts', link: 'Metamorph Leader'},
			{value: 'hand flamer metamorph claw', label: 'hand flamer and metamorph claw +3pts', link: 'Metamorph Leader'},
			{value: 'bonesword metamorph talon', label: 'bonesword metamorph talon +1pts', link: 'Metamorph Leader'},
			{value: 'bonesword metamorph whip', label: 'bonesword metamorph whip +2pts', link: 'Metamorph Leader'},
			{value: 'bonesword metamorph claw', label: 'bonesword metamorph claw +2pts', link: 'Metamorph Leader'},
			{value: 'bonesword hand flamer metamorph talon', label: 'bonesword hand flamer and metamorph talon +3pts', link: 'Metamorph Leader'},
			{value: 'bonesword hand flamer metamorph whip', label: 'bonesword hand flamer and metamorph whip +4pts', link: 'Metamorph Leader'},
			{value: 'bonesword hand flamer metamorph claw', label: 'bonesword hand flamer and metamorph claw +4pts', link: 'Metamorph Leader'},
    ];
		
		const options4 = [
			{value: 'none', label: 'none', link: 'Reiver'},
      {value: 'Grav-Chute', label: 'Grav-Chute +1pts', link: 'Reiver'},
			{value: 'Grapnel Launcher', label: 'Grapnel Launcher +1pts', link: 'Reiver'},
			{value: 'Grav-Chute Grapnel Launcher', label: 'Grav-Chute and Grapnel Launcher +2pts', link: 'Reiver'},
			
      {value: 'none', label: 'none', link: 'Reiver Sergeant'},
      {value: 'Grav-Chute', label: 'Grav-Chute +1pts', link: 'Reiver Sergeant'},
			{value: 'Grapnel Launcher', label: 'Grapnel Launcher +1pts', link: 'Reiver Sergeant'},
			{value: 'Grav-Chute Grapnel Launcher', label: 'Grav-Chute and Grapnel Launcher +2pts', link: 'Reiver Sergeant'},
			
			{value: 'none', label: 'none', link: 'Guardsman'},
			{value: 'Vox-Caster', label: 'Vox-Caster +5pts', link: 'Guardsman'},
			
			{value: 'none', label: 'none', link: 'Scion'},
			{value: 'Vox-Caster', label: 'Vox-Caster +5pts', link: 'Scion'},
			
			{value: 'none', label: 'none', link: 'Skitarii Ranger'},
			{value: 'Enhanced Data-Tether', label: 'Enhanced Data-Tether +5pts', link: 'Skitarii Ranger'},
			{value: 'Omnispex', label: 'Omnispex +1pts', link: 'Skitarii Ranger'},
			
			{value: 'none', label: 'none', link: 'Skitarii Vanguard'},
			{value: 'Enhanced Data-Tether', label: 'Enhanced Data-Tether +5pts', link: 'Skitarii Vanguard'},
			{value: 'Omnispex', label: 'Omnispex +1pts', link: 'Skitarii Vanguard'},
			
			{value: 'none', label: 'none', link: 'Chaos Space Marine'},
			{value: 'Icon of Despair', label: 'Icon of Despair +3pts', link: 'Chaos Space Marine'},
			{value: 'Icon of Wrath', label: 'Icon of Wrath +5pts', link: 'Chaos Space Marine'},
			{value: 'Icon of Flame', label: 'Icon of Flame +1pts', link: 'Chaos Space Marine'},
			{value: 'Icon of Excess', label: 'Icon of Excess +5pts', link: 'Chaos Space Marine'},
			{value: 'Icon of Vengeance', label: 'Icon of Vengeance +1pts', link: 'Chaos Space Marine'},
			
			{value: 'none', label: 'none', link: 'Plague Marine'},
			{value: 'Icon of Despair', label: 'Icon of Despair +3pts', link: 'Plague Marine'},

			{value: 'none', label: 'none', link: 'Rubric Marine'},
			{value: 'Icon of Flame', label: 'Icon of Flame +1pts', link: 'Rubric Marine'},
			
			{value: 'none', label: 'none', link: 'Tzaangor'},
			{value: 'Brayhorn', label: 'Brayhorn +3pts', link: 'Tzaangor'},
			
			{value: 'none', label: 'none', link: 'Termagant'},
			{value: 'Adrenal Glands', label: 'Adrenal Glands +1pts', link: 'Termagant'},
			{value: 'Toxin Sacs', label: 'Toxin Sacs +1pts', link: 'Termagant'},
			{value: 'Adrenal Glands Toxin Sacs', label: 'Adrenal Glands and Toxin Sacs +2pts', link: 'Termagant'},
						
			{value: 'none', label: 'none', link: 'Hormagaunt'},
			{value: 'Adrenal Glands', label: 'Adrenal Glands +1pts', link: 'Hormagaunt'},
			{value: 'Toxin Sacs', label: 'Toxin Sacs +1pts', link: 'Hormagaunt'},
			{value: 'Adrenal Glands Toxin Sacs', label: 'Adrenal Glands and Toxin Sacs +2pts', link: 'Hormagaunt'},

			{value: 'none', label: 'none', link: 'Genestealer'},
			{value: 'Extended Carapace', label: 'Extended Carapace +0pts', link: 'Genestealer'},
			{value: 'Toxin Sacs', label: 'Toxin Sacs +1pts', link: 'Genestealer'},
			{value: 'Extended Carapace Toxin Sacs', label: 'Extended Carapace and Toxin Sacs +1pts', link: 'Genestealer'},

			{value: 'none', label: 'none', link: 'Tyranid Warrior'},
			{value: 'Toxin Sacs', label: 'Toxin Sacs +1pts', link: 'Tyranid Warrior'},
			{value: 'Adrenal Glands', label: 'Adrenal Glands +1pts', link: 'Tyranid Warrior'},
			{value: 'flesh hooks', label: 'flesh hooks +0pts', link: 'Tyranid Warrior'},
			{value: 'Adrenal Glands Toxin Sacs', label: 'Adrenal Glands and Toxin Sacs +2pts', link: 'Tyranid Warrior'},
			{value: 'Adrenal Glands flesh hooks', label: 'Adrenal Glands and flesh hooks +1pts', link: 'Tyranid Warrior'},
			{value: 'Toxin Sacs flesh hooks', label: 'Toxin Sacs and flesh hooks +1pts', link: 'Tyranid Warrior'},
			{value: 'Adrenal Glands Toxin Sacs flesh hooks', label: 'Adrenal Glands, Toxin Sacs, and flesh hooks +2pts', link: 'Tyranid Warrior'},

			{value: 'none', label: 'none', link: 'Tyranid Warrior Gunner'},
			{value: 'Toxin Sacs', label: 'Toxin Sacs +1pts', link: 'Tyranid Warrior Gunner'},
			{value: 'Adrenal Glands', label: 'Adrenal Glands +1pts', link: 'Tyranid Warrior Gunner'},
			{value: 'flesh hooks', label: 'flesh hooks +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'Adrenal Glands Toxin Sacs', label: 'Adrenal Glands and Toxin Sacs +2pts', link: 'Tyranid Warrior Gunner'},
			{value: 'Adrenal Glands flesh hooks', label: 'Adrenal Glands and flesh hooks +1pts', link: 'Tyranid Warrior Gunner'},
			{value: 'Toxin Sacs flesh hooks', label: 'Toxin Sacs and flesh hooks +1pts', link: 'Tyranid Warrior Gunner'},
			{value: 'Adrenal Glands Toxin Sacs flesh hooks', label: 'Adrenal Glands, Toxin Sacs, and flesh hooks +2pts', link: 'Tyranid Warrior Gunner'},

			{value: 'none', label: 'none', link: 'Acolyte Hybrid'},
			{value: 'Cult Icon', label: 'Cult Icon +5pts', link: 'Acolyte Hybrid'},

			{value: 'none', label: 'none', link: 'Neophyte Hybrid'},
			{value: 'Cult Icon', label: 'Cult Icon +5pts', link: 'Neophyte Hybrid'},

			{value: 'none', label: 'none', link: 'Hybrid Metamorph'},
			{value: 'Cult Icon', label: 'Cult Icon +5pts', link: 'Hybrid Metamorph'},
		]
    const filteredOptions2 = options3.filter((o) => o.link === this.state.unit.unitType)
		const filteredOptions3 = options4.filter((o) => o.link === this.state.unit.unitType)

    return (
			<Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>&ldquo;{this.state.unit.name}&rdquo;</h1>
              <h2>{this.state.unit.unitType}</h2>
            </Jumbotron>
          </Col>
        </Row>
				<Row><button style={{ display: "block", margin: "auto" }}className="btn btn-primary" onClick={this.update}>Update</button></Row>
				{this.state.unit ? (
        <Row>
          <Col size="md-2 md-offset-1">&nbsp;</Col>
          <Col size="md-8 md-offset-1">
            <List>
							<ListItem>
              <Table className="table table-bordered" style={{backgroundColor : "#cec9c7"}}>
								<Thead>
									<Tr style={{borderLeft : "none", borderRight : "none", border : "2px solid black", backgroundColor : "#c94309"}}>
										<Th style={{borderLeft : "none", borderRight : "none", width : "30%"}}>NAME</Th>
										<Th style={{borderLeft : "none", borderRight : "none"}}>M&nbsp;</Th>
										<Th style={{borderLeft : "none", borderRight : "none"}}>WS</Th>
										<Th style={{borderLeft : "none", borderRight : "none"}}>BS</Th>
										<Th style={{borderLeft : "none", borderRight : "none"}}>S&nbsp;</Th>
										<Th style={{borderLeft : "none", borderRight : "none"}}>T&nbsp;</Th>
										<Th style={{borderLeft : "none", borderRight : "none"}}>W&nbsp;</Th>
										<Th style={{borderLeft : "none", borderRight : "none"}}>A&nbsp;</Th>
										<Th style={{borderLeft : "none", borderRight : "none"}}>LD</Th>
										<Th style={{borderLeft : "none", borderRight : "none"}}>SV</Th>
									</Tr>
								</Thead>
                  <Tbody>
                    <Tr>
                      <Td style={{width : "30%"}}>
											<Input
												value={this.state.name}
												onChange={this.handleInputChange}
												style={{ "width": "100%"}}
												name="name"
												placeholder={this.state.unit.name}
											/>
                      </Td>
                      <Td>
                        {this.state.unit.move}"
                      </Td>
                      <Td>
                        {this.state.unit.ws}+
                      </Td>
                      <Td>
                        {this.state.unit.bs}+
                      </Td>
                      <Td>
                        {this.state.unit.str}
                      </Td>
                      <Td>
                        {this.state.unit.tough}
                      </Td>
                      <Td>
                        {this.state.unit.wounds}
                      </Td>
                      <Td>
                        {this.state.unit.att}
                      </Td>
                      <Td>
                        {this.state.unit.ld}
                      </Td>
                      <Td>
                        {this.state.unit.sv}+
                      </Td>
                    </Tr>
                  </Tbody>
              </Table>
							<span style={{ float: "left", width : "50%" }}>Wargear Options</span>
							<div style={{ float: "left", width : "50%" }}>
								<Select
									name="wargear"
									value={this.state.wargearOptions.value}
									onChange={this.handleChange3}
									options={filteredOptions2}
								/>
							</div>
							<Table className="table table-bordered" style={{backgroundColor : "#cec9c7"}}>
								<Thead>
									<Tr style={{borderLeft : "none", borderRight : "none", borderTop : "2px solid black", backgroundColor : "#c94309"}}>
										<Th style={{borderLeft : "none", borderRight : "none", width : "25%"}}>WEAPON</Th>
										<Th style={{borderLeft : "none", borderRight : "none", width : "5%"}}>RANGE</Th>
										<Th style={{borderLeft : "none", borderRight : "none", width : "20%"}}>TYPE</Th>
										<Th style={{borderLeft : "none", borderRight : "none", width : "5%"}}>S</Th>
										<Th style={{borderLeft : "none", borderRight : "none", width : "5%"}}>AP</Th>
										<Th style={{borderLeft : "none", borderRight : "none", width : "5%"}}>D</Th>
										<Th style={{borderLeft : "none", borderRight : "none", width : "35%"}}>ABILITIES</Th>
									</Tr>
								</Thead>
									{guns.map((gun, index) => {
										if (this.state.unit.equipment !== undefined) {
											return(
												<Tbody key={index}>
													{this.state.unit.equipment.split(', ').map((item, index) => {
														if (item === gun.weapon) {
															return(
																<Tr key={index}>
																	<Td style={{width : "25%"}}>{gun.weapon}</Td>
																	<Td style={{width : "5%"}}>{gun.range}"</Td>
																	<Td style={{width : "20%"}}>{gun.type}</Td>
																	<Td style={{width : "5%"}}>{gun.strength}</Td>
																	<Td style={{width : "5%"}}>{gun.AP}</Td>
																	<Td style={{width : "5%"}}>{gun.damage}</Td>
																	<Td style={{width : "35%"}}>{gun.abilities}</Td>
																</Tr>
															)
														} else {
															return null;
														}
													})}
											</Tbody>
											)
										} else {
											return null;
										}
									})}
							</Table>
							<span style={{ float: "left", width : "50%" }}>Other Options</span>
							<div style={{ float: "left", width : "50%" }}>
								<Select
									name="other-options"
									value={this.state.wargearOptions2.value}
									onChange={this.handleChange4}
									options={filteredOptions3}
								/>
							</div>
							<Table className="table table-bordered" style={{backgroundColor : "#cec9c7"}}>
								<Thead>
									<Tr>
										<Th>
											ABILITIES:
										</Th>
									</Tr>
								</Thead>
								<Tbody>
									<Tr>
										<Td>
											<a data-tip data-for='unit-abilities'> {this.state.unit.abilities} </a>
											<ReactTooltip id='unit-abilities' type='warning' effect='solid'>
												<span>Ability info goes here</span>
											</ReactTooltip>
										</Td>
									</Tr>
								</Tbody>
							</Table>
							<Table className="table table-bordered" style={{backgroundColor : "#cec9c7"}}>
								<Thead>
									<Tr>
										<Th>
											Specialism:
										</Th>
									</Tr>
								</Thead>
								<Tbody>
									<Tr>
										<Td>
											{this.state.unit.specialism}
										</Td>
									</Tr>
								</Tbody>
							</Table>
							</ListItem>
            </List>
          </Col>
				</Row>

				) : (
					<h3>No Results to Display</h3>
				)}
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Units</Link>
          </Col>
        </Row>
      </Container>
		);
  }
}

export default Detail;
