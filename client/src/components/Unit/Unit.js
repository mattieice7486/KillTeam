import React from "react";
import Bolter from "../Guns/Bolter";
import PlasmaGun from "../Guns/PlasmaGun";
import "./Unit.css";

const Unit = props =>
    <div>
        <table className="table table-striped">
            <thead>
                <tr>
                    12 POINTS
                </tr>
                <tr>
                    <th scope="col">NAME</th>
                    <th scope="col">M</th>
                    <th scope="col">WS</th>
                    <th scope="col">BS</th>
                    <th scope="col">S</th>
                    <th scope="col">T</th>
                    <th scope="col">W</th>
                    <th scope="col">A</th>
                    <th scope="col">Ld</th>
                    <th scope="col">Sv</th>
                </tr>
            </thead>
            <tbody className="">
                    <tr>
                        <td>Matthias</td>
                        <td>6</td>
                        <td>3+</td>
                        <td>3+</td>
                        <td>4</td>
                        <td>4</td>
                        <td>1</td>
                        <td>1</td>
                        <td>7</td>
                        <td>3+</td>
                    </tr>
            </tbody>
        </table>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">WEAPON</th>
                    <th scope="col">RANGE</th>
                    <th scope="col">TYPE</th>
                    <th scope="col">S</th>
                    <th scope="col">AP</th>
                    <th scope="col">D</th>
                    <th scope="col">ABILITES</th>
                </tr>
            </thead>
            <tbody className="LeaderTable">
                    <Bolter />
                    <PlasmaGun />
                    <tr>
                        <td>&nbsp;</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>ABILITIES</td>
                    </tr>
                    <tr>
                        <td>Specialism</td>
                        <td>DEMEANOR</td>
                    </tr>
                    <tr>
                        <td>EXPERIENCE</td>
                        <td>FLESH WOUNDS</td>
                        <td>CONVALESCENCE</td>
                        <td>NEW RECRUIT</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox"></input>
                            <input type="checkbox"></input>
                            <input type="checkbox"></input>
                            <input type="checkbox"></input>
                            <input type="checkbox"></input>
                            <input type="checkbox"></input>
                            <input type="checkbox"></input>
                            <input type="checkbox"></input>
                            <input type="checkbox"></input>
                            <input type="checkbox"></input>
                            <input type="checkbox"></input>
                            <input type="checkbox"></input>
                        </td>
                        <td>
                            <input type="checkbox"></input>
                            <input type="checkbox"></input>
                            <input type="checkbox"></input>
                        </td>
                        <td><input type="checkbox"></input></td>
                        <td><input type="checkbox"></input></td>
                    </tr>
            </tbody>
        </table>
    </div>

export default Unit;
