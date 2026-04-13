import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownTrayIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline';
import ResourceCard from '@/components/ui/ResourceCard';
import SearchBar from '@/components/ui/SearchBar';
import CategoryFilter from '@/components/ui/CategoryFilter';

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    fetchResources();
    loadFavorites();
  }, []);

  useEffect(() => {
    filterAndSortResources();
  }, [resources, searchQuery, selectedCategory, selectedType, sortBy]);

  const fetchResources = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedType !== 'all') params.append('type', selectedType);
      if (sortBy) params.append('sort', sortBy);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/resources?${params.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResources(data);
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = () => {
    try {
      const saved = localStorage.getItem('favoriteResources');
      if (saved) {
        setFavorites(new Set(JSON.parse(saved)));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = (newFavorites) => {
    try {
      localStorage.setItem('favoriteResources', JSON.stringify([...newFavorites]));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const filterAndSortResources = () => {
    let filtered = [...resources];

    // Filter by search query (client-side search for immediate feedback)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.title?.toLowerCase().includes(query) ||
        r.description?.toLowerCase().includes(query) ||
        r.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(r => r.category === selectedCategory);
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(r => r.resource_type === selectedType);
    }

    // Sort
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => (b.usage_count || 0) - (a.usage_count || 0));
    } else if (sortBy === 'a_z') {
      filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    }

    setFilteredResources(filtered);
  };

  const handleDownload = async (resource) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/resources/${resource.resource_id}/download`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.file_url) {
          // Open file URL in new tab
          window.open(data.file_url, '_blank');
        } else if (data.content) {
          // For text content, you might want to display it differently
          console.log('Content:', data.content);
        }
      }
    } catch (error) {
      console.error('Error downloading resource:', error);
    }
  };

  const handleToggleFavorite = (resource) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(resource.resource_id)) {
      newFavorites.delete(resource.resource_id);
    } else {
      newFavorites.add(resource.resource_id);
    }
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const getCategoryCounts = () => {
    const counts = { all: resources.length };
    resources.forEach(r => {
      if (r.category) {
        counts[r.category] = (counts[r.category] || 0) + 1;
      }
    });
    return counts;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  const categoryCounts = getCategoryCounts();
  const favoriteResources = filteredResources.filter(r => favorites.has(r.resource_id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Resources
        </h1>
        <p className="text-text-secondary">
          Download scripts, templates, guides, and more to accelerate your success
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-background-alt border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gold/20 rounded-lg">
              <ArrowDownTrayIcon className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gold">{resources.length}</p>
              <p className="text-text-secondary text-sm">Total Resources</p>
            </div>
          </div>
        </div>

        <div className="bg-background-alt border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <StarIcon className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gold">{favoriteResources.length}</p>
              <p className="text-text-secondary text-sm">Favorites</p>
            </div>
          </div>
        </div>

        <div className="bg-background-alt border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <ClockIcon className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gold">
                {resources.filter(r => {
                  const diffDays = Math.floor((new Date() - new Date(r.created_at)) / (1000 * 60 * 60 * 24));
                  return diffDays <= 7;
                }).length}
              </p>
              <p className="text-text-secondary text-sm">New This Week</p>
            </div>
          </div>
        </div>

        <div className="bg-background-alt border border-border rounded-lg p-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
            <option value="a_z">A to Z</option>
          </select>
        </div>
      </div>

      {/* Search */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={() => setSearchQuery('')}
        placeholder="Search resources by title, description, or tags..."
      />

      {/* Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <div className="bg-background-alt border border-border rounded-lg p-6 sticky top-6">
            <CategoryFilter
              selectedCategory={selectedCategory}
              selectedType={selectedType}
              onCategoryChange={setSelectedCategory}
              onTypeChange={setSelectedType}
              categoryCounts={categoryCounts}
            />

            {/* Favorites Toggle */}
            <div className="mt-6 pt-6 border-t border-border">
              <button
                onClick={() => {
                  // Toggle between showing all and only favorites
                  if (selectedCategory === 'favorites') {
                    setSelectedCategory('all');
                  } else {
                    setSelectedCategory('favorites');
                  }
                }}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center space-x-2 ${
                  selectedCategory === 'favorites'
                    ? 'bg-gold text-background'
                    : 'bg-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10'
                }`}
              >
                <StarIcon className="h-4 w-4" />
                <span>Show Favorites</span>
                <span className={`text-xs ${
                  selectedCategory === 'favorites' ? 'text-background/70' : 'text-text-muted'
                }`}>
                  ({favorites.size})
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="lg:col-span-3">
          {filteredResources.length > 0 ? (
            <>
              {/* Results Count */}
              <div className="mb-4 text-text-secondary text-sm">
                {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredResources.map((resource) => (
                  <ResourceCard
                    key={resource.resource_id}
                    resource={resource}
                    isFavorite={favorites.has(resource.resource_id)}
                    onDownload={handleDownload}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-background-alt border border-border rounded-lg">
              <p className="text-text-secondary mb-2">
                {searchQuery || selectedCategory !== 'all' || selectedType !== 'all'
                  ? 'No resources match your filters'
                  : 'No resources available yet'}
              </p>
              <p className="text-text-muted text-sm">
                {searchQuery || selectedCategory !== 'all' || selectedType !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Check back soon for new resources'}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
