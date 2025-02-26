import jerawat from "../assets/jerawat.png";
import komedo from "../assets/komedo.png";
import flek from "../assets/flek.png";
import pori from "../assets/pori.png";
import berminyak from "../assets/berminyak.png";
import kering from "../assets/kering.png";
import normal from "../assets/normal.png";
import kombinasi from "../assets/kombinasi.png";

export const SKIN_TYPE_MAP = [
    {
        value: 0,
        label: 'Kulit Berminyak',
        icon: berminyak
    },
    {
        value: 1,
        label: 'Kulit Kering',
        icon: kering
    },
    {
        value: 2,
        label: 'Kulit Normal',
        icon: normal
    },
    {
        value: 3,
        label: 'Kulit Kombinasi',
        icon: kombinasi
    },
]
export const SKIN_CONDITION_MAP = [
    {
        value: 'acne',
        label: 'Jerawat',
        icon: jerawat
    },
    {
        value: 'blackhead',
        label: 'Komedo',
        icon: komedo
    },
    {
        value: 'skin_spot',
        label: 'Flek',
        icon: flek
    },
    {
        value: 'pores',
        label: 'Pori Besar',
        icon: pori
    },
];