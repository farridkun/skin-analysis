import jerawat from "../assets/jerawat_logo.png";
import komedo from "../assets/komedo_logo.png";
import flek from "../assets/flek_logo.png";
import pori from "../assets/pori_logo.png";
import berminyak from "../assets/berminyak.png";
import kering from "../assets/kering.png";
import normal from "../assets/normal.png";
import kombinasi from "../assets/kombinasi.png";

export const SKIN_TYPE_MAP = [
    {
        value: 0,
        label: 'Oily Skin',
        icon: berminyak,
        desc: 'Based on the analysis results, your skin tends to be oily, characterized by excess sebum production that can cause clogged pores, blackheads, and acne. To maintain skin balance, it is recommended to use a cleanser that controls oil, mild exfoliation, and a light moisturizer to keep your skin healthy without feeling excessively oily.'
    },
    {
        value: 1,
        label: 'Dry Skin',
        icon: kering,
        desc: 'Based on the analysis results, your skin tends to be dry, characterized by a rough texture, feels stiff, or peels easily. Dry skin requires optimal hydration with the use of gentle cleansers, moisturizers rich in humectants such as hyaluronic acid, and extra protection with sunscreen to maintain skin moisture and health.'
    },
    {
        value: 2,
        label: 'Normal Skin',
        icon: normal,
        desc: 'Based on the analysis, your skin is classified as normal, with a good balance between oil and moisture. Normal skin still requires regular care with a gentle cleanser, light moisturizer, and sunscreen to maintain healthy and bright skin.'
    },
    {
        value: 3,
        label: 'Combination Skin',
        icon: kombinasi,
        desc: 'Based on the analysis, your skin is classified as combination, with certain areas such as the T-zone (forehead, nose, chin) being more oily, while other areas tend to be normal or dry. Combination skin care requires balancing moisture without making the oily areas shinier, using a mild cleanser, a moisturizer that is not too heavy, and sunscreen for maximum protection.'
    },
]
export const SKIN_CONDITION_MAP = [
    {
        value: 'acne',
        label: 'Acne',
        icon: jerawat,
        desc: 'Based on the results of the facial analysis, your skin condition shows a more dominant tendency towards acne. Acne can be caused by various factors, such as excess oil production, clogged pores, bacteria, stress, and diet. To overcome this condition, the main treatment should be focused on controlling excess oil, cleaning pores, and reducing inflammation. It is recommended to routinely clean your face using a cleanser containing salicylic acid or benzoyl peroxide, and maintain skin moisture with products containing niacinamide or centella asiatica so that the skin remains healthy and is not prone to acne. In addition, the use of sunscreen is also important to protect the skin and prevent acne scars from becoming darker.'
    },
    {
        value: 'blackhead',
        label: 'Blackhead',
        icon: komedo,
        desc: 'Based on the results of the facial analysis, your skin condition shows a tendency towards blackheads. Blackheads are formed due to pores being clogged by oil, dead skin cells, and dirt. Blackheads can appear in the form of blackheads that are open and oxidized, or whiteheads that are closed under the surface of the skin. To overcome this condition, the main treatment should be focused on cleaning the pores and controlling oil production. Using a facial cleanser with salicylic acid can help clean the pores deeply, while light exfoliation using AHA/BHA can help remove dead skin cells so they dont clog the pores. In addition, using a clay mask regularly can also help absorb excess oil and prevent the appearance of new blackheads.'
    },
    {
        value: 'skin_spot',
        label: 'Blemish',
        icon: flek,
        desc: 'Based on the results of the facial analysis, your skin condition shows a tendency to be more dominant towards spots. Spots or hyperpigmentation can appear due to sun exposure, dark acne scars, aging, or hormonal changes. To overcome this condition, the main treatment should be focused on brightening the skin and preventing the appearance of new spots. Using sunscreen with an SPF of at least 30 is very important to protect the skin from UV rays that can worsen spots. In addition, using active ingredients such as vitamin C, niacinamide, alpha arbutin, or retinol can help brighten the skin and fade spots gradually. Regularly doing light exfoliation can also help accelerate skin cell regeneration to make it look brighter and more even.'
    },
    {
        value: 'pores',
        label: 'Pores',
        icon: pori,
        desc: 'Based on the results of the facial analysis, your skin condition shows a tendency towards large pores. Pores that appear large are generally caused by excess oil production, decreased skin elasticity, or accumulation of dirt and dead skin cells that clog the pores. To overcome this condition, the main treatment should be focused on maintaining the cleanliness of the pores and increasing skin elasticity. Using a facial cleanser containing salicylic acid can help clean the pores deeply, while niacinamide and retinol can help control oil production and improve skin texture to make it look smoother. In addition, regular use of a clay mask can also help absorb excess oil and reduce the appearance of pores.'
    },
];