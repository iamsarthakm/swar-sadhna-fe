import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { useState, useEffect } from 'react';
function createData(values) {
    let out = []
    for (let value of values) {
        out.push(getDisplayValue(value))
    }
    values = values.map(value => getDisplayValue(value))
    return { ...out };
}

let rows = [
    // createData('Sa', 'Re', 'Ga', "Ma", "Pa", "dha", 'Ni'),
    // createData('Sa', 'Re', 'Ga', "Ma", "Pa", "dha", 'Ni'),
    // createData('Sa', 'Re', 'Ga', "Ma", "Pa", "dha", 'Ni'),
    // createData('Sa', 'Re', 'Ga', "Ma", "Pa", "dha", 'Ni'),
    // createData('Sa', 'Re', 'Ga', "Ma", "Pa", "dha", 'Ni'),
];

// const taal = [
//     "Dha", "Dhi", "Na", "Dha", "Ti", "Na"
// ]
function addDotBelow(string) {
    // Define the dot below combining character

    let middleIndex = Math.floor(string.length / 2);

    // Insert the character at the middle index
    let modifiedString = string.substring(0, middleIndex) + '\u0005' + string.substring(middleIndex);

    // Append the dot below character to the entire string
    const stringWithDotBelow = modifiedString;

    return stringWithDotBelow;
}
function getDisplayValue(inputs) {
    console.log("input is", inputs)
    let modifiedString = "";

    for (let input of inputs) {
        modifiedString += input.slice(2, 4)
        if (input.includes('_k')) {
            modifiedString += "(k)"
        }


        else if (input.includes('_t')) {
            modifiedString += "(t)"
        }


        if (input.includes('l_')) {
            modifiedString = '<u>' + modifiedString + '</u>';
        }

        if (input.includes('h_')) {
            modifiedString = '<span STYLE="text-decoration:overline">' + modifiedString + '</span>'
        }
        modifiedString += " ";
    }
    return modifiedString;
}

const displayNotes = (taal, composition, start) => {
    rows = []
    let tempDisplayArray = []
    console.log("composition", composition)
    while (start - 1 > 0) {
        start = start - 1
        tempDisplayArray.push("_")
    }


    for (let note of composition) {

        tempDisplayArray.push(note)
        if (tempDisplayArray.length == taal.length) {
            rows.push(createData(tempDisplayArray))
            tempDisplayArray = []
        }

    }
    if (tempDisplayArray.length > 0 && tempDisplayArray.length < taal.length) {
        const emptyStringsToAdd = taal.length - tempDisplayArray.length;
        for (let i = 0; i < emptyStringsToAdd; i++) {
            tempDisplayArray.push('');
        }
        rows.push(createData(tempDisplayArray))
        tempDisplayArray = []
    }
    tempDisplayArray = []
}

console.log("rows", rows)
const SheetMusic = (props) => {
    const { taal, composition, start } = props;
    displayNotes(taal, composition, start)
    // useEffect(() => {
    //     displayNotes(taal, composition, start);
    // }, [taal, composition, start]);
    return (
        <TableContainer component={Paper} sx={{ minWidth: 1200 }}>
            <Table sx={{ minWidth: 650, fontWeight: 'medium' }} size="large" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {taal.map((item, index) => (
                            <React.Fragment key={index}>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>{item}</TableCell>
                                {index === taal.length / 2 - 1 && ( // Render divider for all cells except the last one
                                    <React.Fragment>
                                        <Divider orientation="vertical" variant="middle" sx={{ height: 30, marginRight: 4 }} flexItem />
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody sx={{ mt: 10 }}>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            {Object.values(row).map((cell, cellIndex) => (
                                <React.Fragment key={cellIndex}>
                                    <TableCell sx={{ fontSize: 20, textAlign: 'center' }}>
                                        <span dangerouslySetInnerHTML={{ __html: cell }} />
                                    </TableCell>
                                    {(cellIndex === Object.values(row).length / 2 - 1) && (
                                        <Divider orientation="vertical" variant="middle" sx={{ height: 30, marginRight: 4 }} flexItem />
                                    )}
                                </React.Fragment>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default SheetMusic;
