import React from 'react'

const Torus = () => {
    const [b, setb] = React.useState("");
    const wrapper = ()=>{
        let params = {A:1, B:1};
        setInterval(()=>{
            params=asciiframe(params)
        }, 50)
    };
    let asciiframe = ({A, B}) => {
        let b = [];
        let z = [];
        A+= 0.07;
        B += 0.03;
        let cA = Math.cos(A), sA = Math.sin(A),
            cB = Math.cos(B), sB = Math.sin(B);
        const LINE_LENGTH = 80;
        const NUM_LINES = 24;
        for (let k = 0; k < NUM_LINES*LINE_LENGTH; k++) {
            b[k] = (k % LINE_LENGTH) === LINE_LENGTH-1 ? "\n" : " ";//initialize with spaces and rows of size 80, 22 rows
            z[k] = 0;
        }
        for (let j = 0; j < 6.28; j += 0.07) { // j <=> theta
            let ct = Math.cos(j), st = Math.sin(j);
            for (let i = 0; i < 6.28; i += 0.02) {   // i <=> phi
                let sp = Math.sin(i), cp = Math.cos(i),
                    h = ct + 2, // R1 + R2*cos(theta)
                    D = 1 / (sp * h * sA + st * cA + 5), // this is 1/z
                    t = sp * h * cA - st * sA; // this is a clever factoring of some of the terms in x' and y'

                let x = 0 | (40 + 30 * D * (cp * h * cB - t * sB)),
                    y = 0 | (12 + 15 * D * (cp * h * sB + t * cB)),
                    o = x + 80 * y,
                    N = 0 | (8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
                if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
                    z[o] = D;
                    b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
                }
            }
        }
        setb(b.join(""));
        return {A, B}
    };
    React.useEffect(() => {
        wrapper()
    }, []);
    return <pre style={{
        fontFamily:'Courier New, Courier, monospace',
        backgroundColor: '#000',
        color: '#ccc',
        fontSize: '10pt'
    }}>{b}</pre>
};

export default Torus
