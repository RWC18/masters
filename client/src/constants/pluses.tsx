import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';

export const pluses = [
  {
    title: 'Intuitive Interface',
    description:
      'Our user-friendly interface makes design effortless and enjoyable. From beginners to seasoned designers, everyone can easily navigate our platform and bring their ideas to life.',
    icon: (
      <TouchAppOutlinedIcon
        htmlColor={'#000'}
        sx={{
          width: '32px',
          height: '32px',
        }}
      />
    ), // MUI icon for touch interface
  },
  {
    title: 'AI-Powered Magic',
    description:
      "Experience the magic of AI with Vai's cutting-edge technology. Our intelligent algorithms analyze your inputs and suggest creative enhancements, ensuring your designs are always top-notch.",
    icon: (
      <FlashOnOutlinedIcon
        htmlColor={'#000'}
        sx={{
          width: '32px',
          height: '32px',
        }}
      />
    ), // MUI icon for lightning or magic
  },
  {
    title: 'Endless Possibilities',
    description:
      'With a vast library of templates, fonts, colors, and graphics, your creativity knows no bounds. Customize every aspect of your design to match your vision perfectly.',
    icon: (
      <PaletteOutlinedIcon
        htmlColor={'#000'}
        sx={{
          width: '32px',
          height: '32px',
        }}
      />
    ), // MUI icon for palette or creativity
  },
  {
    title: 'Time-Saving Solutions',
    description:
      'Say goodbye to tedious design processes. Vai streamlines your workflow, allowing you to create polished designs in minutes, not hours.',
    icon: (
      <AccessTimeOutlinedIcon
        htmlColor={'#000'}
        sx={{
          width: '32px',
          height: '32px',
        }}
      />
    ), // MUI icon for time or efficiency
  },
  {
    title: 'Quality Assurance',
    description:
      'We prioritize quality in every aspect of our platform. From high-resolution images to seamless user experiences, Vai delivers excellence at every step of the design journey.',
    icon: (
      <StarOutlinedIcon
        htmlColor={'#000'}
        sx={{
          width: '32px',
          height: '32px',
        }}
      />
    ), // MUI icon for quality or excellence
  },
  {
    title: 'Security Features',
    description:
      'Rest assured knowing your data is safe with us. Vai employs state-of-the-art security measures to protect your designs and personal information.',
    icon: (
      <SecurityOutlinedIcon
        htmlColor={'#000'}
        sx={{
          width: '32px',
          height: '32px',
        }}
      />
    ), // MUI icon for security or protection
  },
];
