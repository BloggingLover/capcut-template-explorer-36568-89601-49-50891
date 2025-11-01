import { Preferences } from '@capacitor/preferences';
import { VideoTemplate } from './api';

const FAVORITES_KEY = 'capcut_favorites';

export const FavoritesService = {
  async getFavorites(): Promise<string[]> {
    try {
      const { value } = await Preferences.get({ key: FAVORITES_KEY });
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },

  async addFavorite(templateId: string): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      if (!favorites.includes(templateId)) {
        favorites.push(templateId);
        await Preferences.set({
          key: FAVORITES_KEY,
          value: JSON.stringify(favorites),
        });
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  },

  async removeFavorite(templateId: string): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const updated = favorites.filter(id => id !== templateId);
      await Preferences.set({
        key: FAVORITES_KEY,
        value: JSON.stringify(updated),
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  },

  async isFavorite(templateId: string): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.includes(templateId);
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  },

  async toggleFavorite(templateId: string): Promise<boolean> {
    const isFav = await this.isFavorite(templateId);
    if (isFav) {
      await this.removeFavorite(templateId);
      return false;
    } else {
      await this.addFavorite(templateId);
      return true;
    }
  }
};
