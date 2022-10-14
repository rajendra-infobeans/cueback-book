var colors_R2 = {
  // Neutrals
  neutral600: '11,12,15',
  neutral400: '46,49,62',
  neutral200: '76,83,103',
  neutral150: '193,195,202',
  neutral100: '226,228,233',

  // Blues
  blue600: '5,39,71',
  blue400: '10,77,143',
  blue200: '170,210,248',
  blue100: '217,235,252',

  // pineapples
  pineapple400: '173,135,0',
  pineapple200: '255,238,177,0.25',
  pineapple100: '255,238,177',

  // cucumbers
  cucumber400: '8,130,122',
  cucumber100: '198,244,241',

  // dragonfruits
  dragonfruit400: '161,0,155',
  dragonfruit100: '255,230,254',

  // guavas
  guava400: '198,74,74',
  guava100: '249,236,236',

  // Whites
  white: '255,255,255',
  offWhite: '243,245,247',

  error400: '153,25,46',

  card_bg_white: '7,53,98,0.05',

  rightCkick: '55, 65, 81',
};

colors_R2.blueberry100 = colors_R2.blue100;
colors_R2.blueberry400 = colors_R2.blue400;

const theme_R2 = {
  colors: colors_R2,
  // Buttons
  buttonPrimaryBg: `rgb(${colors_R2.neutral600})`,
  buttonPrimaryText: `rgb(${colors_R2.white})`,
  buttonPrimaryBorder: `rgb(${colors_R2.neutral600})`,
  buttonSecondaryBg: `rgb(${colors_R2.offWhite})`,
  buttonSecondaryText: `rgb(${colors_R2.neutral600})`,
  buttonSecondaryBorder: `rgb(${colors_R2.neutral100})`,
  buttonSecondaryBorderHover: `rgb(${colors_R2.neutral200})`,

  // Page Components
  pageTextBody: `rgb(${colors_R2.neutral200})`,
  pageTextListNumberBg: `rgb(${colors_R2.offWhite})`,
  pageTextListNumberColor: `rgb(${colors_R2.neutral200})`,
  sectionBorder: `rgb(${colors_R2.neutral100})`,

  //card Component
  cardBackground: `rgba(${colors_R2.card_bg_white})`,
  rightCkick: `rgba(${colors_R2.rightCkick})`,
};

const theme = theme_R2;

export default theme;
