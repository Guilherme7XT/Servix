export const colors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  background: '#F8F9FA',
  surface: '#FFFFFF',
  text: '#333333',
  textSecondary: '#666666',
  border: '#E1E5E9',
  shadow: '#000000',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  body: {
    fontSize: 16,
    color: colors.text,
  },
  caption: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  small: {
    fontSize: 12,
    color: colors.textSecondary,
  },
};

export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 12,
  },
};

export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.medium,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    fontSize: 16,
    ...shadows.small,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.medium,
  },
  buttonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
};
