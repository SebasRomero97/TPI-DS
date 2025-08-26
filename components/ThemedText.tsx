import { StyleSheet, Text, type TextProps } from 'react-native';


export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'miniTitulo';
  className?: string
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  className,
  ...rest
}: ThemedTextProps) {

  return (
    <Text
      style={[
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'miniTitulo' ? styles.miniTitulo : undefined,
        style,
      ]}
      className={className}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  miniTitulo:{
    //items-center color-[#7672ff] text-2xl font-semibold pb-4
    color: '#7672ff',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 600,
    paddingBottom: 16
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SpaceMono'
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: 'SpaceMono'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
    fontFamily: 'SpaceMono'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono'
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
    fontFamily: 'SpaceMono'
  },
});
