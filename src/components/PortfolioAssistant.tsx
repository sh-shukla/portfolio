import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, MessageCircle, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import portfolioData from "@/data/portfolioData.json";

const PortfolioAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = portfolioData.categories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className={`w-14 h-14 rounded-full shadow-2xl transition-all duration-300 ${
            isOpen
              ? "bg-red-500 hover:bg-red-600"
              : "glass-morphism-strong premium-hover border-0"
          }`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <MessageCircle className="w-6 h-6 text-white" />
            )}
          </motion.div>
        </Button>
      </motion.div>

      {/* Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-80 h-[450px] glass-morphism-strong rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden border border-white/20"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-primary/20 to-secondary/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full glass-morphism flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Portfolio Assistant</h3>
                  <p className="text-xs text-white/70">Explore Shashank's Profile</p>
                </div>
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                <Input
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass-morphism border-white/20 text-white placeholder:text-white/50 text-sm"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredCategories.map((category) => (
                <Card key={category.id} className="glass-morphism border-white/10">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{category.icon}</span>
                        <span className="text-sm font-medium text-white">{category.title}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedCategory === category.id ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-4 h-4 text-white/70" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedCategory === category.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-3">
                            {category.items.map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-3 glass-morphism rounded-lg"
                              >
                                <h4 className="text-xs font-semibold text-primary mb-2">
                                  {item.question}
                                </h4>
                                <p className="text-xs text-white/80 leading-relaxed">
                                  {item.answer}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              ))}

              {filteredCategories.length === 0 && searchQuery && (
                <div className="text-center py-8">
                  <p className="text-white/60 text-sm">No results found for "{searchQuery}"</p>
                  <p className="text-white/40 text-xs mt-2">Try different keywords</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/10 bg-gradient-to-r from-background/50 to-background/30">
              <p className="text-xs text-white/50 text-center">
                💡 Click categories to explore • Search to find specific topics
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioAssistant;